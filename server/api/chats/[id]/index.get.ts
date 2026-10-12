import { getChatByIdForUser } from "../../../repository/chatRepository";
import { getAuthenticatedUserId } from "~~/server/utils/auth";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id")!;
  const userId = await getAuthenticatedUserId(event);

  const chat = await getChatByIdForUser(id, userId);

  if (!chat) {
    throw createError({
      statusCode: 404,
      statusMessage: "Chat not found",
    });
  }

  return chat;
});
