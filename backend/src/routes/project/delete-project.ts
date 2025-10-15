import { FastifyInstance, FastifyReply } from "fastify";
import { db } from "index";
import { projects } from "@db/schema";
import { eq } from "drizzle-orm";

interface DeleteProjectParams {
  id: number;
}

export async function deleteProject(app: FastifyInstance) {
  app.delete<{ Params: DeleteProjectParams }>('/projects/:id', async (request, reply: FastifyReply) => {
    try {
      const { id } = request.params;

      await db.delete(projects).where(eq(projects.id, id));

      return reply.modified('Projeto deletado com sucesso!');
    } catch (error) {
      console.log(error);

      return reply.error('Ocorreu um erro ao deletar projeto! Por favor, tente novamente.');
    }
  });
}