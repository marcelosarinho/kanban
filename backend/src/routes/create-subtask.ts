import { FastifyInstance } from "fastify";
import { db } from "..";
import { subtasks } from "@db/schema";

export async function createSubtask(app: FastifyInstance) {
  app.post('/projects/:id/tasks/:taskId/subtasks', async (request: any, reply: any) => {
    try {
      const { taskId } = request.params;
      const { name } = request.body;

      await db.insert(subtasks).values({
        name,
        done: false,
        taskId,
      })

      return reply.status(201).send({ message: 'Subtarefa criada com sucesso!' });
    } catch (error) {
      console.log(error);
    }
  })
}