import { StudyCoachAgent } from "./agents/StudyCoachAgent.js";

async function test() {
  const agent = new StudyCoachAgent();

  console.log("Testing StudyCoachAgent with 90 minutes of study time...\n");

  const result = await agent.run({
    userId: "testuser123",
    availableTime: 90, // 90 minutes
  });

  console.log("Study plan result:", JSON.stringify(result, null, 2));

  // Test with shorter time
  console.log("\n\nTesting with 45 minutes of study time...\n");
  
  const result2 = await agent.run({
    userId: "testuser123",
    availableTime: 45, // 45 minutes
  });

  console.log("Study plan result (45 min):", JSON.stringify(result2, null, 2));
}

test().catch(console.error);
