import { FastifyInstance, FastifyReply } from "fastify";
import { db } from "index";
import { subtasks } from "@db/schema";
import { eq } from "drizzle-orm";
import { createErrorLog } from "@routes/helpers/log";

interface DeleteSubtaskParams {
  subtaskId: number;
}

export async function deleteSubtask(app: FastifyInstance) {
  app.delete<{ Params: DeleteSubtaskParams }>('/projects/:id/tasks/:taskId/subtasks/:subtaskId', async (request, reply: FastifyReply) => {
    const { subtaskId } = request.params;

    if (!subtaskId) {
      return reply.badRequest('ID da subtarefa não informado!');
    }

    try {
      await db.delete(subtasks).where(eq(subtasks.id, subtaskId));

      return reply.modified('Subtarefa deletada com sucesso!');
    } catch (error) {
      createErrorLog(error as Error, request, reply);

      return reply.error('Ocorreu um erro ao deletar subtarefa! Por favor, tente novamente.');
    }
  })
}