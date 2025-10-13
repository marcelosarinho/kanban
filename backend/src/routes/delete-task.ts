import { FastifyInstance, FastifyReply } from "fastify";
import { db } from "..";
import { eq } from "drizzle-orm";
import { tasks } from "@db/schema";

interface DeleteTaskParams {
  taskId: number;
}

export async function deleteTask(app: FastifyInstance) {
  app.delete<{ Params: DeleteTaskParams }>('/projects/:id/tasks/:taskId', async (request, reply: FastifyReply) => {
    try {
      const { taskId } = request.params;

      await db.delete(tasks).where(eq(tasks.id, taskId));

      return reply.modified('Tarefa deletada com sucesso!');
    } catch (error) {
      console.log(error);

      return reply.error('Ocorreu um erro ao deletar tarefa! Por favor, tente novamente.');
    }
  })
}