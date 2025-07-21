import { FastifyInstance } from "fastify";
import { db } from "..";
import { tasks } from "../db/schema";
import { eq, sql } from "drizzle-orm";

export async function updateTask(app: FastifyInstance) {
  app.patch('/projects/:id/tasks/:taskId', async (request: any, reply: any) => {
    try {
      const { taskId } = request.params;
      const data = request.body;

      await db.update(tasks).set({
        ...data,
        updatedAt: sql`NOW()`
      }).where(eq(tasks.id, taskId));

      return reply.status(200).send({ message: 'Tarefa atualizada com sucesso!' });
    } catch (error) {
      console.log(error);
    }
  })
}