import { FastifyInstance, FastifyReply } from "fastify";
import { db } from "index";
import { tasks } from "@db/schema";
import { TaskStatusOption } from "@custom-types/task";
import { createActionLog } from "@routes/helpers/log";

interface CreateTaskParams {
  id: number;
}

interface CreateTaskBody {
  status: TaskStatusOption;
}

export async function createTask(app: FastifyInstance) {
  app.post<{ Params: CreateTaskParams, Body: CreateTaskBody }>('/projects/:id/tasks', { preHandler: app.auth }, async (request, reply: FastifyReply) => {
    const { id } = request.params;
    const { status } = request.body;

    if (!request.user?.id) {
      return reply.badRequest('ID do usuário não informado!');
    }

    if (!id) {
      return reply.badRequest('ID do projeto não informado!');
    }

    if (!status) {
      return reply.badRequest('Status da tarefa não informado!');
    }

    await db.transaction(async (tx) => {
      const newTask = await tx.insert(tasks).values({
        projectId: id,
        status,
        name: 'Nova tarefa',
        description: 'Descrição da nova tarefa',
        priority: 'low',
        progress: 0,
        done: false,
      }).returning();

      await createActionLog('create', request, tx, `Usuário de ID ${request.user?.id} criou a tarefa de ID ${newTask[0].id} no projeto de ID ${id}`);
    });

    return reply.created('Tarefa criada com sucesso!');
  })
}