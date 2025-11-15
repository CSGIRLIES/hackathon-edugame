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

  for (const [id, doc] of Object.entries(db.docs)) {
    if (id.startsWith(`${userId}::`)) {
      chunks.push(doc.text);
    }
  }

  return chunks;
}

// ===== QuizGenerationAgent =====
export class QuizGenerationAgent {
  name = "QuizGenerationAgent";
  description = "Generates quizzes from uploaded document chunks using AI.";

  inputs = {
    userId: "string",
    numQuestions: "number", // optional, default 5
  };

  async run({ userId, numQuestions = 5 }) {
    console.log("[QuizGenerationAgent] Generating quiz for", userId);

    const chunks = await getUserChunks(userId);
    if (chunks.length === 0) {
      return { error: "No chunks found for this user." };
    }

    // Concatenate chunks (limit to avoid token limits)
    const context = chunks.slice(0, 10).join("\n").substring(0, 4000);

    const prompt = `Generate a quiz with ${numQuestions} multiple-choice questions based on the following text. Each question should have 4 options (A, B, C, D) and indicate the correct answer.

Format the response as JSON with this structure:
{
  "questions": [
    {
      "question": "What is...?",
      "options": ["A) Option1", "B) Option2", "C) Option3", "D) Option4"],
      "answer": "A"
    }
  ]
}

Text:
${context}`;

    try {
      const rawResponse = await generateWithMistral(prompt);
      // Extract JSON from response
      const jsonMatch = rawResponse.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("No valid JSON found in AI response");
      }
      const quiz = JSON.parse(jsonMatch[0]);

      return {
        status: "success",
        quiz: quiz.questions || [],
      };
    } catch (e) {
      console.error("[QuizGenerationAgent] Error generating quiz:", e);
      return { error: "Failed to generate quiz." };
    }
  }
}
