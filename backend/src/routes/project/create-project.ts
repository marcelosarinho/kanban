import { FastifyInstance, FastifyReply } from "fastify";
import { db } from "index";
import { projects } from "@db/schema";
import { createErrorLog } from "@routes/helpers/log";

interface CreateProjectBody {
  name: string;
  description: string;
  userId: string;
}

export async function createProject(app: FastifyInstance) {
  app.post<{ Body: CreateProjectBody }>('/projects', async (request, reply: FastifyReply) => {
    const { name, description, userId } = request.body;

    if (!userId) {
      return reply.badRequest('ID do usuário não informado!');
    }

    if (!name || !description) {
      return reply.badRequest('Nome e descrição do projeto são obrigatórios!');
    }

    try {
      await db.insert(projects).values({ name, description, userId: Number(userId) });

      return reply.created('Projeto criado com sucesso!');
    } catch (error) {
      createErrorLog(error as Error, request, reply);

      return reply.error('Ocorreu um erro ao criar projeto! Por favor, tente novamente.');
    }
  })
}