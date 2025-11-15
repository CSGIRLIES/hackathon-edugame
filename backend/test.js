import fs from "fs";

// Load the vector DB (where you stored chunks)
const db = JSON.parse(fs.readFileSync("./data/vectorstore.json", "utf-8"));

function searchChunks(query, topK = 5) {
  const results = Object.values(db.docs)
    .filter((doc) => doc.text.toLowerCase().includes(query.toLowerCase()))
    .slice(0, topK);

  return results;
}

// Example usage:
const query = "push"; 
const matchingChunks = searchChunks(query);

console.log("Relevant chunks:");
matchingChunks.forEach((c, i) => console.log(i + 1, c.text.slice(0, 200), "..."));
