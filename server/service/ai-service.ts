import { generateText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import type { Message, LanguageModelV1 } from "ai";

export const createOpenAiModel = (apiKey: string) => {
  const openai = createOpenAI({
    apiKey,
  });
  return openai("gpt-4o-mini");
};

export async function generateChatResponse(
  model: LanguageModelV1,
  messages: Message[]
) {
  if (!Array.isArray(messages) || messages.length === 0) {
    throw new Error("Invalid messages format");
  }

  const response = await generateText({
    model,
    messages,
  });

  return response.text.trim();
}
