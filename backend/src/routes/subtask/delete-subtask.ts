import { FastifyInstance, FastifyReply } from "fastify";
import { db } from "index";
import { subtasks } from "@db/schema";
import { eq } from "drizzle-orm";
import { createActionLog } from "@routes/helpers/log";

interface DeleteSubtaskParams {
  id: number;
}

export async function deleteSubtask(app: FastifyInstance) {
  app.delete<{ Params: DeleteSubtaskParams }>('/subtasks/:id', async (request, reply: FastifyReply) => {
    const { id } = request.params;

    if (!id) {
      return reply.badRequest('ID da subtarefa não informado!');
    }

    const subtask = await db.query.subtasks.findFirst({ where: eq(subtasks.id, id) });

    if (!subtask) {
      return reply.notFound('Subtarefa não encontrada!');
    }

    await db.transaction(async (tx) => {
      await db.delete(subtasks).where(eq(subtasks.id, id));

      await createActionLog('delete', request, tx, `Usuário de ID ${request.user?.id} deletou a subtarefa de ID ${id} na tarefa de ID ${subtask.taskId}`);
    });

    return reply.modified('Subtarefa deletada com sucesso!');
  })
}