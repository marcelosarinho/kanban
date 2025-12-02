import { FastifyInstance, FastifyReply } from "fastify";
import { db } from "index";
import { subtasks } from "@db/schema";
import { createActionLog } from "@routes/helpers/log";

interface CreateSubtaskBody {
  name: string;
}

interface CreateSubtaskParams {
  id: number;
}

export async function createSubtask(app: FastifyInstance) {
  app.post<{ Params: CreateSubtaskParams, Body: CreateSubtaskBody }>('/tasks/:id/subtasks', async (request, reply: FastifyReply) => {
    const { id } = request.params;
    const { name } = request.body;

    if (!id) {
      return reply.badRequest('ID da tarefa não informado!');
    }

    if (!name) {
      return reply.badRequest('Nome da subtarefa não informado!');
    }

    await db.transaction(async (tx) => {
      const subtask = await tx.insert(subtasks).values({
        name,
        done: false,
        taskId: id,
      }).returning();
  
      await createActionLog('create', request, tx, `Usuário de ID ${request.user?.id} criou a subtarefa de ID ${subtask[0].id} na tarefa de ID ${id}`);
    });

    return reply.created('Subtarefa criada com sucesso!');
  })
}