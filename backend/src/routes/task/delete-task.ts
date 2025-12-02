import { FastifyInstance, FastifyReply } from "fastify";
import { db } from "index";
import { eq } from "drizzle-orm";
import { tasks } from "@db/schema";
import { createActionLog } from "@routes/helpers/log";

interface DeleteTaskParams {
  id: number;
}

export async function deleteTask(app: FastifyInstance) {
  app.delete<{ Params: DeleteTaskParams }>('/tasks/:id', { preHandler: app.auth }, async (request, reply: FastifyReply) => {
    const { id } = request.params;

    if (!request.user?.id) {
      return reply.unauthorized('Usuário não autenticado!');
    }

    if (!id) {
      return reply.badRequest('ID da tarefa não informado!');
    }

    const task = await db.query.tasks.findFirst({ where: eq(tasks.id, Number(id)) });

    if (!task) {
      return reply.notFound('Tarefa não encontrada!');
    }

    await db.transaction(async (tx) => {
      await tx.delete(tasks).where(eq(tasks.id, Number(id)));

      await createActionLog('delete', request, tx, `Usuário de ID ${request.user?.id} deletou a tarefa de ID ${id} no projeto de ID ${task.projectId}`);
    });


    return reply.modified('Tarefa deletada com sucesso!');
  })
}