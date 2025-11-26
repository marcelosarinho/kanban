import { FastifyInstance, FastifyReply } from "fastify";
import { db } from "index";
import { tasks } from "@db/schema";
import { TaskStatusOption } from "@custom-types/task";
import { createErrorLog } from "@routes/helpers/log";

interface CreateTaskParams {
  id: number;
}

interface CreateTaskBody {
  status: TaskStatusOption;
}

export async function createTask(app: FastifyInstance) {
  app.post<{ Params: CreateTaskParams, Body: CreateTaskBody }>('/projects/:id/tasks', async (request, reply: FastifyReply) => {
    const { id } = request.params;
    const { status } = request.body;

    if (!id) {
      return reply.badRequest('ID do projeto não informado!');
    }

    if (!status) {
      return reply.badRequest('Status da tarefa não informado!');
    }

    try {
      await db.insert(tasks).values({
        projectId: id,
        status,
        name: 'Nova tarefa',
        description: 'Descrição da nova tarefa',
        priority: 'low',
        progress: 0,
        done: false,
      });

      return reply.created('Tarefa criada com sucesso!');
    } catch (error) {
      createErrorLog(error as Error, request, reply);

      return reply.error('Ocorreu um erro ao criar tarefa! Por favor, tente novamente.');
    }
  })
}