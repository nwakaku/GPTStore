import fs from "fs";
import OpenAI from "openai";


const openai = new OpenAI({
  apiKey: ''
});

// const upF = require("../output.json")

export async function main(): Promise<OpenAI.Beta.Assistants.Assistant> {
  
  const file = await openai.files.create({
    file:  fs.createReadStream("output.json"), // Upload JSON string as file content
    purpose: "assistants",
  });

  // Delete the file after it has been uploaded
  await fs.promises.unlink("output.json");


  const myAssistant = await openai.beta.assistants.create({
    instructions:
      "You are a Developer Advocate, and you have access to files to answer developer questions about company documentation.",
    name: "Dev Advocate",
    tools: [{ type: "retrieval" }],
    model: "gpt-3.5-turbo-1106",
    file_ids: [file.id],
  });

  console.log(myAssistant);
  return myAssistant;
}
