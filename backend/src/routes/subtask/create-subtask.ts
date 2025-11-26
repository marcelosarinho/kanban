import { FastifyInstance, FastifyReply } from "fastify";
import { db } from "index";
import { subtasks } from "@db/schema";

interface CreateSubtaskBody {
  name: string;
}

interface CreateSubtaskParams {
  taskId: number;
}

export async function createSubtask(app: FastifyInstance) {
  app.post<{ Params: CreateSubtaskParams, Body: CreateSubtaskBody }>('/projects/:id/tasks/:taskId/subtasks', async (request, reply: FastifyReply) => {
    const { taskId } = request.params;
    const { name } = request.body;

    if (!taskId) {
      return reply.badRequest('ID da tarefa não informado!');
    }

    if (!name) {
      return reply.badRequest('Nome da subtarefa não informado!');
    }

    await db.insert(subtasks).values({
      name,
      done: false,
      taskId,
    })

    return reply.created('Subtarefa criada com sucesso!');
  })
}