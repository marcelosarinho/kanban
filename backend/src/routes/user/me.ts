import { users } from "@db/schema";
import { eq } from "drizzle-orm";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { db } from "index";
import { createErrorLog } from "@routes/helpers/log";

export function me(app: FastifyInstance) {
  app.get('/me', { preHandler: app.auth }, async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.user!;

    if (!id) {
      return reply.badRequest('Erro ao encontrar usuário!');
    }

    try {
      const user = await db.query.users.findFirst({ where: eq(users.id, Number(id)) });

      if (!user) {
        return reply.badRequest('Erro ao encontrar usuário!');
      }

      return reply.ok('Usuário encontrado!', user);
    } catch (error) {
      createErrorLog(error as Error, request, reply);

      return reply.error('Erro ao encontrar usuário!');
    }
  });
}