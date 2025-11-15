import { StudyCoachAgent } from "../agents/StudyCoachAgent.js";

const studyCoachAgent = new StudyCoachAgent();

/**
 * POST /study/plan
 * 
 * Request body:
 * {
 *   "userId": "user123",
 *   "availableTime": 90  // in minutes
 * }
 * 
 * Response:
 * {
 *   "status": "success",
 *   "studyPlan": {
 *     "totalTime": 90,
 *     "pomodoroCount": 3,
 *     "focusMinutes": 25,
 *     "breakMinutes": 5,
 *     "longBreakMinutes": 15,
 *     "cycles": [...],
 *     "tips": [...],
 *     "summary": "...",
 *     "materialsUsed": ["file1.pdf", "file2.docx"],
 *     "createdAt": "2025-11-14T22:51:00.000Z"
 *   }
 * }
 */
export async function createStudyPlan(req, res) {
  try {
    const { userId, availableTime } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    if (!availableTime) {
      return res.status(400).json({ error: "availableTime is required (in minutes)" });
    }

    const result = await studyCoachAgent.run({
      userId,
      availableTime: parseInt(availableTime, 10),
    });

    if (result.error) {
      return res.status(400).json(result);
    }

    return res.json(result);
  } catch (err) {
    console.error("Error creating study plan:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
