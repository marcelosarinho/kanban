import { FastifyInstance, FastifyReply } from "fastify";
import { db } from "index";
import { actionLogs, projects } from "@db/schema";
import { createActionLog } from "@routes/helpers/log";
import { eq } from "drizzle-orm";

interface CreateProjectBody {
  name: string;
  description: string;
  userId: string;
}

export async function createProject(app: FastifyInstance) {
  app.post<{ Body: CreateProjectBody }>('/projects', async (request, reply: FastifyReply) => {
    const { name, description } = request.body;

    if (!request.user?.id) {
      return reply.badRequest('ID do usuário não informado!');
    }

    if (!name || !description) {
      return reply.badRequest('Nome e descrição do projeto são obrigatórios!');
    }

    const project = await db.query.projects.findFirst({ where: eq(projects.name, name) });

    if (project) {
      return reply.conflict('Projeto já cadastrado!');
    }

    await db.transaction(async (tx) => {
      const newProject = await tx.insert(projects).values({ name, description, userId: Number(request.user?.id) }).returning();

      // await createActionLog('create', request, tx, `Usuário de ID ${request.user?.id} criou o projeto de ID ${newProject[0].id}`);
    })

    return reply.created('Projeto criado com sucesso!');
  })
}