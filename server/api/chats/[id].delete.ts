import {
  getChatByIdForUser,
  deleteChat,
} from "../../repository/chatRepository";
import { getAuthenticatedUserId } from "~~/server/utils/auth";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id")!;
  const userId = await getAuthenticatedUserId(event);

  // Verify user owns the chat
  const chat = await getChatByIdForUser(id, userId);
  if (!chat) {
    throw createError({
      statusCode: 404,
      statusMessage: "Chat not found",
    });
  }

  const storage = useStorage("db");
  await storage.setItem(`chats:has-new-chat:${userId}`, true);

  return deleteChat(id);
});
