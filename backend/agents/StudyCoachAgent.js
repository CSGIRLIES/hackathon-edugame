import "dotenv/config";
import fs from "fs/promises";
import path from "path";
import fetch from "node-fetch";

// ===== Vector Store (JSON) =====
const DB_PATH = path.resolve("data/vectorstore.json");

async function loadVectorDB() {
  try {
    const raw = await fs.readFile(DB_PATH, "utf8");
    return JSON.parse(raw);
  } catch {
    return { vectors: [], docs: {} };
  }
}

// ===== AI Generation =====
const MISTRAL_CHAT_URL = "https://api.mistral.ai/v1/chat/completions";

async function generateWithMistral(prompt) {
  const res = await fetch(MISTRAL_CHAT_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "open-mistral-7b",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 2048,
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Mistral API error response:", errorText);
    throw new Error(`Mistral API error: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();
  return json.choices[0]?.message?.content || "";
}

// ===== Retrieve Chunks =====
async function getUserChunks(userId) {
  const db = await loadVectorDB();
  const chunks = [];
  const fileNames = new Set();

  for (const [id, doc] of Object.entries(db.docs)) {
    if (id.startsWith(`${userId}::`)) {
      chunks.push(doc.text);
      fileNames.add(doc.filename);
    }
  }

  return { chunks, fileNames: Array.from(fileNames) };
}

// ===== StudyCoachAgent =====
export class StudyCoachAgent {
  name = "StudyCoachAgent";
  description =
    "Creates a personalized study plan using Pomodoro technique based on available time and uploaded material.";

  inputs = {
    userId: "string",
    availableTime: "number", // in minutes
  };

  async run({ userId, availableTime }) {
    console.log(
      "[StudyCoachAgent] Creating study plan for",
      userId,
      "with",
      availableTime,
      "minutes"
    );

    if (!availableTime || availableTime < 10) {
      return {
        error: "Please provide at least 10 minutes of available study time.",
      };
    }

    const { chunks, fileNames } = await getUserChunks(userId);
    if (chunks.length === 0) {
      return {
        error:
          "No study material found. Please upload documents first before creating a study plan.",
      };
    }

    // Concatenate chunks (limit to avoid token limits)
    const context = chunks.slice(0, 15).join("\n").substring(0, 5000);
    const materialSummary = `Study material from ${fileNames.join(", ")} (${chunks.length} sections)`;

    const prompt = `You are a study coach AI. A student has ${availableTime} minutes TOTAL available to study. This must include ALL time: focus sessions, breaks between sessions, and quiz completion time. The uploaded study material contains the following topics.

Material: ${materialSummary}

Content preview:
${context}

Create a comprehensive study plan using the Pomodoro Technique. Structure your response as VALID JSON only. Begin your response immediately with { and end with }. Do NOT include any explanations, markdown, or text outside the JSON. Use this EXACT format:

{
  "totalTime": ${availableTime},
  "pomodoroCount": <number of pomodoro cycles>,
  "cycles": [
    {
      "cycleNumber": 1,
      "studyMinutes": <minutes for this cycle's focused study>,
      "quizMinutes": <minutes allocated for answering this cycle's quiz questions>,
      "focusTask": "Study topic X - Focus on understanding...",
      "objectives": ["Objective 1", "Objective 2"],
      "quiz": [
        {
          "question": "Question related to this cycle's content?",
          "options": ["A) Option 1", "B) Option 2", "C) Option 3", "D) Option 4"],
          "answer": "A"
        }
      ]
    }
  ],
  "breakMinutes": <minutes for short breaks between cycles>,
  "longBreakMinutes": <minutes for long break after 4 cycles>,
  "tips": ["Study tip 1", "Study tip 2"],
  "summary": "Brief summary of the study plan"
}

CRITICAL MATHEMATICAL CONSTRAINTS:
- COUNT ALL TIME: Sum(studyMinutes + quizMinutes for ALL cycles) + (short breaks × number of cycles-1) + longBreak must EQUAL ${availableTime}
- For each cycle: studyMinutes + quizMinutes + breakMinutes (except last cycle) + long break allocation must fit within total
- Standard timing: ~20-25 min study + ~3-5 min quiz per cycle, 5 min break between cycles, 15 min long break
- For limited time (<60 min): ~10-15 min study + ~2-3 min quiz per cycle, shorter breaks (3-5 min)
- NUMBER OF CYCLES: Choose count that makes mathematical sense for the total time

RULES:
- Base the focus tasks on the actual study material content
- Make objectives specific and actionable
- Provide practical study tips relevant to the material
- Each cycle MUST include a "quiz" array with 2-3 multiple-choice questions that test the specific content covered in that cycle's focusTask
- Quiz questions should be directly related to the objectives and focus task of that specific cycle
- Each quiz question must have 4 options (A, B, C, D) and indicate the correct answer
- Verify your math: Total should exactly equal ${availableTime} minutes`;

    try {
      const rawResponse = await generateWithMistral(prompt);
      
      // Extract JSON from response
      const jsonMatch = rawResponse.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("No valid JSON found in AI response");
      }
      const studyPlan = JSON.parse(jsonMatch[0]);

      return {
        status: "success",
        studyPlan: {
          ...studyPlan,
          materialsUsed: fileNames,
          createdAt: new Date().toISOString(),
        },
      };
    } catch (e) {
      console.error("[StudyCoachAgent] Error generating study plan:", e);
      return {
        error: "Failed to generate study plan. Please try again.",
        details: e.message,
      };
    }
  }
}
