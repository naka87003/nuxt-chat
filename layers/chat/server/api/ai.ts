import {
  createOpenAIModel,
  generateChatResponse,
} from "../services/ai-service";
import { MessageSchema } from "../schemas";

export default defineEventHandler(async (event) => {
  const { success, data } = await readValidatedBody(
    event,
    MessageSchema.safeParse
  );

  if (!success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
    });
  }

  const { messages } = data as {
    messages: Message[];
    chatId: string;
  };

  const openaiApiKey = useRuntimeConfig().openaiApiKey;
  const openaiModel = createOpenAIModel(openaiApiKey);

  const response = await generateChatResponse(openaiModel, messages);

  return {
    id: messages.length.toString(),
    role: "assistant",
    content: response,
  };
});
