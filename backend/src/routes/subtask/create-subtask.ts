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
    try {
      const { taskId } = request.params;
      const { name } = request.body;

      await db.insert(subtasks).values({
        name,
        done: false,
        taskId,
      })

      return reply.created('Subtarefa criada com sucesso!');
    } catch (error) {
      console.log(error);

      return reply.error('Ocorreu um erro ao criar subtarefa! Por favor, tente novamente.');
    }
  })
}