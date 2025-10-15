import { FastifyInstance, FastifyReply } from "fastify";
import { desc, ilike, or } from "drizzle-orm";
import { projects } from "@db/schema";
import { db } from "index";

interface GetProjectsQuerystring {
  search?: string
}

export async function getProjects(app: FastifyInstance) {
  app.get<{ Querystring: GetProjectsQuerystring }>("/projects", async (request, reply: FastifyReply) => {
    try {
      const { search } = request.query;

      const where = search ? or(ilike(projects.name, `%${search}%`), ilike(projects.description, `%${search}%`)) : undefined;

      const results = await db.query.projects.findMany({
        where,
        orderBy: [desc(projects.createdAt)],
      });

      return reply.ok('Projetos listados com sucesso!', results);
    } catch (error) {
      console.log(error);

      return reply.error('Ocorreu um erro ao listar projetos! Por favor, tente novamente.');
    }
  })
}