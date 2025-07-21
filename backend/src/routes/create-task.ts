import { FastifyInstance } from "fastify";
import { db } from "..";
import { tasks } from "../db/schema";

export async function createTask(app: FastifyInstance) {
  app.post('/projects/:id/tasks', async (request: any, reply: any) => {
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

      return reply.status(201).send({ message: 'Tarefa criada com sucesso!' });
    } catch (error) {
      console.log(error);
    }
  })
}