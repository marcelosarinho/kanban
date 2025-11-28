import { FastifyInstance, FastifyReply } from "fastify";
import { projects } from "@db/schema";
import { db } from "index";
import { and, eq, ne, sql } from "drizzle-orm";
import { createActionLog } from "@routes/helpers/log";

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

    const project = await db.query.projects.findFirst({ where: and(eq(projects.name, name), ne(projects.id, Number(id))) });

    if (project) {
      return reply.conflict('Projeto já cadastrado!');
    }

    await db.update(projects).set({ name, description, updatedAt: sql`NOW()` }).where(eq(projects.id, id));

    await createActionLog('update', request, db, `Usuário de ID ${request.user?.id} atualizou o projeto de ID ${id}`);

    return reply.modified('Projeto atualizado com sucesso!');
  })
}