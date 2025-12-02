import { FastifyInstance } from "fastify";
import { db } from "index";
import { tasks } from "@db/schema";
import { eq, sql } from "drizzle-orm";
import { FastifyReply } from "fastify";
import { TaskPriorityOption, TaskStatusOption } from "@custom-types/task";
import { createActionLog } from "@routes/helpers/log";

interface UpdateTaskBody {
  name: string;
  description: string;
  priority: TaskPriorityOption;
  progress: number;
  done: boolean;
  status: TaskStatusOption;
}

interface UpdateTaskParams {
  taskId: number;
  id: number;
}

export async function updateTask(app: FastifyInstance) {
  app.patch<{ Params: UpdateTaskParams, Body: UpdateTaskBody }>(
    '/tasks/:id',
    { preHandler: app.auth },
    async (request, reply: FastifyReply) => {
    const { id } = request.params;
    const data = request.body;

    if (!id) {
      return reply.badRequest('ID da tarefa não informado!');
    }

    if (!request.user?.id) {
      return reply.badRequest('ID do usuário não informado!');
    }

    const task = await db.query.tasks.findFirst({ where: eq(tasks.id, Number(id)) });

    if (!task) {
      return reply.notFound('Tarefa não encontrada!');
    }

    await db.transaction(async (tx) => {
      await tx.update(tasks).set({
        ...data,
        updatedAt: sql`NOW()`
      }).where(eq(tasks.id, Number(id)));

      await createActionLog('update', request, tx, `Usuário de ID ${request.user?.id} atualizou a tarefa de ID ${id} no projeto de ID ${task.projectId}`);
    });

    return reply.modified('Tarefa atualizada com sucesso!');
  })
}