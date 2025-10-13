import { FastifyInstance } from "fastify";
import { db } from "..";
import { eq } from "drizzle-orm";
import { tasks } from "@db/schema";

export async function deleteTask(app: FastifyInstance) {
  app.delete('/projects/:id/tasks/:taskId', async (request: any, reply: any) => {
    try {
      const { taskId } = request.params;

      await db.delete(tasks).where(eq(tasks.id, taskId));

      return reply.status(200).send({ message: 'Tarefa deletada com sucesso!' });
    } catch (error) {
      console.log(error);
    }
  })
}