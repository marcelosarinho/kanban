import { FastifyInstance, FastifyReply } from "fastify";
import { db } from "index";
import { actionLogs, projects } from "@db/schema";
import { createActionLog } from "@routes/helpers/log";

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

    const project = await db.insert(projects).values({ name, description, userId: Number(userId) });
    await createActionLog('create', request, reply, `Usuário ${userId} criou o projeto ${}`);

    return reply.created('Projeto criado com sucesso!');
  })
}