import { updateChat } from "../../../repository/chatRepository";
import {
  createOpenAiModel,
  generateChatTitle,
} from "../../../service/ai-service";

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);
  const { message } = await readBody(event);
  const openApiKey = useRuntimeConfig().openaiApiKey;
  const openaiModel = createOpenAiModel(openApiKey);

  const title = await generateChatTitle(openaiModel, message);

  return updateChat(id, { title });
});
