import { FastifyInstance, FastifyReply } from "fastify";
import { projects } from "@db/schema";
import { db } from "index";
import { eq, sql } from "drizzle-orm";
import { createErrorLog } from "@routes/helpers/log";

interface UpdateProjectParams {
  id: number;
}

interface UpdateProjectBody {
  name: string;
  description: string;
}

export async function updateProject(app: FastifyInstance) {
  app.put<{ Params: UpdateProjectParams, Body: UpdateProjectBody }>(
    '/projects/:id',
    async (request, reply: FastifyReply) => {
    const { id } = request.params;
    const { name, description } = request.body;

    if (!id) {
      return reply.badRequest('ID do projeto não informado!');
    }

    if (!name || !description) {
      return reply.badRequest('Nome e descrição do projeto são obrigatórios!');
    }

    try {
      await db.update(projects).set({ name, description, updatedAt: sql`NOW()` }).where(eq(projects.id, id));

      return reply.modified('Projeto atualizado com sucesso!');
    } catch (error) {
      createErrorLog(error as Error, request, reply);

      return reply.error('Ocorreu um erro ao atualizar projeto! Por favor, tente novamente.');
    }
  })
}