import { FastifyInstance, FastifyReply } from "fastify";
import { db } from "index";
import { eq } from "drizzle-orm";
import { tasks } from "@db/schema";
import { createErrorLog } from "@routes/helpers/log";

interface DeleteTaskParams {
  taskId: number;
}

export async function deleteTask(app: FastifyInstance) {
  app.delete<{ Params: DeleteTaskParams }>('/projects/:id/tasks/:taskId', async (request, reply: FastifyReply) => {
    const { taskId } = request.params;

    if (!taskId) {
      return reply.badRequest('ID da tarefa não informado!');
    }

    try {
      await db.delete(tasks).where(eq(tasks.id, taskId));

      return reply.modified('Tarefa deletada com sucesso!');
    } catch (error) {
      createErrorLog(error as Error, request, reply);

      return reply.error('Ocorreu um erro ao deletar tarefa! Por favor, tente novamente.');
    }
  })
}