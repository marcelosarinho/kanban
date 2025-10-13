import { FastifyInstance, FastifyReply } from "fastify";
import { projects } from "@db/schema";
import { db } from "..";
import { eq, sql } from "drizzle-orm";

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
    try {
      const { id } = request.params;
      const { name, description } = request.body;

      await db.update(projects).set({ name, description, updatedAt: sql`NOW()` }).where(eq(projects.id, id));

      return reply.modified('Projeto atualizado com sucesso!');
    } catch (error) {
      console.log(error);

      return reply.error('Ocorreu um erro ao atualizar projeto! Por favor, tente novamente.');
    }
  })
}