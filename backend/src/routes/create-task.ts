import { FastifyInstance, FastifyReply } from "fastify";
import { db } from "..";
import { tasks } from "@db/schema";
import { TaskStatusOption } from "@custom-types/task";

interface CreateTaskParams {
  id: number;
}

interface CreateTaskBody {
  status: TaskStatusOption;
}

export async function createTask(app: FastifyInstance) {
  app.post<{ Params: CreateTaskParams, Body: CreateTaskBody }>('/projects/:id/tasks', async (request, reply: FastifyReply) => {
    try {
      const { id } = request.params;
      const { status } = request.body;

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
      console.log(error);

      return reply.error('Ocorreu um erro ao criar tarefa! Por favor, tente novamente.');
    }
  })
}