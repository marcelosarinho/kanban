import { FastifyInstance, FastifyReply } from "fastify";
import { db } from "..";
import { projects } from "@db/schema";

interface CreateProjectBody {
  name: string;
  description: string;
  userId: string;
}

export async function createProject(app: FastifyInstance) {
  app.post<{ Body: CreateProjectBody }>('/projects', async (request, reply: FastifyReply) => {
    try {
      const { name, description, userId } = request.body;

      await db.insert(projects).values({ name, description, userId: Number(userId) });

      return reply.created('Projeto criado com sucesso!');
    } catch (error) {
      console.log(error);

      return reply.error('Ocorreu um erro ao criar projeto! Por favor, tente novamente.');
    }
  })
}