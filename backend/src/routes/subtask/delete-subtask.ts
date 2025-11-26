import { FastifyInstance, FastifyReply } from "fastify";
import { db } from "index";
import { subtasks } from "@db/schema";
import { eq } from "drizzle-orm";

interface DeleteSubtaskParams {
  subtaskId: number;
}

export async function deleteSubtask(app: FastifyInstance) {
  app.delete<{ Params: DeleteSubtaskParams }>('/projects/:id/tasks/:taskId/subtasks/:subtaskId', async (request, reply: FastifyReply) => {
    const { subtaskId } = request.params;

    if (!subtaskId) {
      return reply.badRequest('ID da subtarefa não informado!');
    }

    await db.delete(subtasks).where(eq(subtasks.id, subtaskId));

    return reply.modified('Subtarefa deletada com sucesso!');
  })
}