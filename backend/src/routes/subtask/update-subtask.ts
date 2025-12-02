import { subtasks } from "@db/schema";
import { createActionLog } from "@routes/helpers/log";
import { eq, sql } from "drizzle-orm";
import { FastifyInstance, FastifyReply } from "fastify";
import { db } from "index";

interface UpdateSubtaskParams {
  id: number;
}

interface UpdateSubtaskBody {
  done: boolean;
}

export async function updateSubtask(app: FastifyInstance) {
  app.patch<{ Params: UpdateSubtaskParams, Body: UpdateSubtaskBody }>('/subtasks/:id', { preHandler: app.auth }, async (request, reply: FastifyReply) => {
    const { id } = request.params;
    const { done } = request.body;

    if (!request.user?.id) {
      return reply.badRequest('ID do usuário não informado!');
    }

    if (!id) {
      return reply.badRequest('ID da subtarefa não informado!');
    }

    const subtask = await db.query.subtasks.findFirst({ where: eq(subtasks.id, Number(id)) });

    if (!subtask) {
      return reply.notFound('Subtarefa não encontrada!');
    }

    await db.transaction(async (tx) => {
      await tx.update(subtasks).set({ done, updatedAt: sql`NOW()` }).where(eq(subtasks.id, Number(id)));

      await createActionLog('update', request, tx, `Usuário de ID ${request.user?.id} atualizou a subtarefa de ID ${id} na tarefa de ID ${subtask.taskId}`);
    });

    return reply.modified('Subtarefa atualizada com sucesso!');
  });
}