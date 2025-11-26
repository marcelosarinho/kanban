import { FastifyInstance, FastifyReply } from "fastify";
import { db } from "index";
import { eq } from "drizzle-orm";
import { tasks } from "@db/schema";

interface DeleteTaskParams {
  taskId: number;
}

export async function deleteTask(app: FastifyInstance) {
  app.delete<{ Params: DeleteTaskParams }>('/projects/:id/tasks/:taskId', async (request, reply: FastifyReply) => {
    const { taskId } = request.params;

    if (!taskId) {
      return reply.badRequest('ID da tarefa não informado!');
    }

    await db.delete(tasks).where(eq(tasks.id, taskId));

    return reply.modified('Tarefa deletada com sucesso!');
  })
}