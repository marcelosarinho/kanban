import { FastifyInstance, FastifyReply } from "fastify";
import { db } from "index";
import { projects } from "@db/schema";
import { eq } from "drizzle-orm";

interface DeleteProjectParams {
  id: number;
}

export async function deleteProject(app: FastifyInstance) {
  app.delete<{ Params: DeleteProjectParams }>('/projects/:id', async (request, reply: FastifyReply) => {
    const { id } = request.params;

    if (!id) {
      return reply.badRequest('ID do projeto não informado!');
    }

    await db.delete(projects).where(eq(projects.id, id));

    return reply.modified('Projeto deletado com sucesso!');
  })
}