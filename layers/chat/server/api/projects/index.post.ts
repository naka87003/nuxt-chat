import { createProject } from "../../repository/projectRepository";
import { CreateProjectSchema } from "../../schemas";

export default defineEventHandler(async (event) => {
  const { success, data } = await readValidatedBody(
    event,
    CreateProjectSchema.safeParse
  );

  if (!success) {
    setResponseStatus(event, 400, "Bad Request");
    return "Bad Request";
  }

  return createProject(data);
});
