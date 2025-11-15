import { QuizGenerationAgent } from "./agents/QuizGenerationAgent.js";

async function test() {
  const agent = new QuizGenerationAgent();

  const result = await agent.run({
    userId: "testuser123",
    numQuestions: 3,
  });

  console.log("Quiz generation result:", JSON.stringify(result, null, 2));
}

test().catch(console.error);
