import { FastifyInstance, FastifyReply } from "fastify";
import { db } from "index";
import { projects } from "@db/schema";
import { eq } from "drizzle-orm";
import { createErrorLog } from "@routes/helpers/log";

interface DeleteProjectParams {
  id: number;
}

export async function deleteProject(app: FastifyInstance) {
  app.delete<{ Params: DeleteProjectParams }>('/projects/:id', async (request, reply: FastifyReply) => {
    const { id } = request.params;

    if (!id) {
        return reply.badRequest('ID do projeto não informado!');
    }

    try {
      await db.delete(projects).where(eq(projects.id, id));

      return reply.modified('Projeto deletado com sucesso!');
    } catch (error) {
      createErrorLog(error as Error, request, reply);

      return reply.error('Ocorreu um erro ao deletar projeto! Por favor, tente novamente.');
    }
  });
}