// app/api/updateArchive/route.js

import fs from "fs";
import path from "path";

export async function POST(req) {
  const newItem = await req.json(); // Parse JSON from request body
  const filePath = path.join(
    process.cwd(),
    "public",
    "Archive",
    "Archive.json"
  );

  // Read the existing JSON file
  const fileData = fs.readFileSync(filePath, "utf-8");
  const jsonData = JSON.parse(fileData);

  // Push the new item to the array
  jsonData.items.push(newItem);

  // Write the updated data back to the JSON file
  fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), "utf-8");

  return new Response(JSON.stringify({ message: "Item added successfully" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
