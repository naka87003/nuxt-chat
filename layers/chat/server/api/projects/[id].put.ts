import {
  updateProject,
  getProjectById,
} from "../../repository/projectRepository";
import { UpdateProjectSchema } from "../../schemas";

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);

  const { success, data } = await readValidatedBody(
    event,
    UpdateProjectSchema.safeParse
  );

  const project = await getProjectById(id);
  if (!project) return 404;

  if (!success) {
    setResponseStatus(event, 400, "Bad Request");
    return "Bad Request";
  }

  return updateProject(id, data);
});
