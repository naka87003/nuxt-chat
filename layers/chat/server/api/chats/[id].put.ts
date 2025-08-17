import { updateChat } from "../../repository/chatRepository";
import { UpdateChatSchema } from "../../schemas";

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);

  const { success, data } = await readValidatedBody(
    event,
    UpdateChatSchema.safeParse
  );

  if (!success) {
    setResponseStatus(event, 400, "Bad Request");
    return "Bad Request";
  }

  const storage = useStorage("db");
  await storage.setItem("chats:has-new-chat", true);

  return updateChat(id, data);
});
