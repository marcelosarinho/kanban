import { FastifyInstance } from "fastify";
import { db } from "..";
import { subtasks } from "@db/schema";
import { eq } from "drizzle-orm";

export async function deleteSubtask(app: FastifyInstance) {
  app.delete('/projects/:id/tasks/:taskId/subtasks/:subtaskId', async (request: any, reply: any) => {
    try {
      const { subtaskId } = request.params;

      await db.delete(subtasks).where(eq(subtasks.id, subtaskId));

      return reply.status(200).send({ message: 'Subtarefa deletada com sucesso!' });
    } catch (error) {
      console.log(error);
    }
  })
}