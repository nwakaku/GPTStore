import fs from "fs";
import OpenAI from "openai";

const openAIApiKey = "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";
const assistantId = "asst_NCuD339x7Ufga3obEAkH5NzL";


const openai = new OpenAI({
  apiKey: openAIApiKey
});


export async function answer(userQuestion : string) {
    // Create a thread using the assistantId
    const thread = await openai.beta.threads.create();
    
    // Pass in the user question into the existing thread
    await openai.beta.threads.messages.create(thread.id, {
        role: "user",
        content: userQuestion,
      });

    // Create a run
    const run = await openai.beta.threads.runs.create(thread.id, {
        assistant_id: assistantId,
    });

    // Imediately fetch run-status, which will be "in_progress"
    let runStatus = await openai.beta.threads.runs.retrieve(
        thread.id,
        run.id
    );

    // Polling mechanism to see if runStatus is completed
    while (runStatus.status !== "completed") {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        runStatus = await openai.beta.threads.runs.retrieve(
          thread.id,
          run.id
        );

        // Check for failed, cancelled, or expired status
        if (["failed", "cancelled", "expired"].includes(runStatus.status)) {
          console.log(
            `Run status is '${runStatus.status}'. Unable to complete the request.`
          );
          break; // Exit the loop if the status indicates a failure or cancellation
        }
    }

    // Get the last assistant message from the messages array
    const messages = await openai.beta.threads.messages.list(thread.id);

    // Find the last message for the current run
    const lastMessageForRun = messages.data
      .filter(
        (message) =>
          message.run_id === run.id && message.role === "assistant"
      )
      .pop();

      // If an assistant message is found, console.log() it
      if (lastMessageForRun) {
        console.log(`${lastMessageForRun.content}`);
      } else if (
        !["failed", "cancelled", "expired"].includes(runStatus.status)
      ) {
        console.log("No response received from the assistant.");
      }

    const theMessage = lastMessageForRun ? lastMessageForRun.content : "err";


  return theMessage
}