import { FastifyInstance, FastifyReply } from "fastify";
import { db } from "index";
import { subtasks } from "@db/schema";
import { eq } from "drizzle-orm";

interface DeleteSubtaskParams {
  subtaskId: number;
}

export async function deleteSubtask(app: FastifyInstance) {
  app.delete<{ Params: DeleteSubtaskParams }>('/projects/:id/tasks/:taskId/subtasks/:subtaskId', async (request, reply: FastifyReply) => {
    try {
      const { subtaskId } = request.params;

      await db.delete(subtasks).where(eq(subtasks.id, subtaskId));

      return reply.modified('Subtarefa deletada com sucesso!');
    } catch (error) {
      console.log(error);

      return reply.error('Ocorreu um erro ao deletar subtarefa! Por favor, tente novamente.');
    }
  })
}