import { getAllProjectsByUser } from "../../repository/projectRepository";
import { getAuthenticatedUserId } from "~~/server/utils/auth";

export default defineEventHandler(async (event) => {
  const userId = await getAuthenticatedUserId(event);

  return getAllProjectsByUser(userId);
});
