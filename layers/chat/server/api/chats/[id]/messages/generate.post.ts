import {
  getMessagesByChatId,
  createMessageForChat,
} from "../../../../repository/chatRepository";
import {
  createOpenAiModel,
  generateChatResponse,
} from "../../../../service/ai-service";

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);
  const history = getMessagesByChatId(id);

  const openai = createOpenAiModel(useRuntimeConfig().openaiApiKey);

  const reply = await generateChatResponse(openai, history);

  return createMessageForChat({
    chatId: id,
    content: reply,
    role: "assistant",
  });
});
