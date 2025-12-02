import { FastifyInstance, FastifyReply } from "fastify";
import { db } from "index";
import { projects } from "@db/schema";
import { eq } from "drizzle-orm";
import { createActionLog } from "@routes/helpers/log";

interface DeleteProjectParams {
  id: number;
}

export async function deleteProject(app: FastifyInstance) {
  app.delete<{ Params: DeleteProjectParams }>('/projects/:id', { preHandler: app.auth }, async (request, reply: FastifyReply) => {
    const { id } = request.params;

    if (!request.user?.id) {
      return reply.badRequest('ID do usuário não informado!');
    }

    if (!id) {
      return reply.badRequest('ID do projeto não informado!');
    }

    await db.transaction(async (tx) => {
      await tx.delete(projects).where(eq(projects.id, id));

      await createActionLog('delete', request, tx, `Usuário de ID ${request.user?.id} deletou o projeto de ID ${id}`);
    });

    return reply.modified('Projeto deletado com sucesso!');
  })
}