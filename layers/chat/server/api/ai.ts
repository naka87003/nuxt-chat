import { createOpenAiModel, generateChatResponse } from "../service/ai-service";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { messages } = body;

  const id = messages.length.toString();

  const openApiKey = useRuntimeConfig().openaiApiKey;
  const openaiModel = createOpenAiModel(openApiKey);

  const response = await generateChatResponse(openaiModel, messages);

  return {
    id,
    role: "assistant",
    content: response,
  };
});
