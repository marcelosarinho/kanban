import { users } from "@db/schema";
import { eq } from "drizzle-orm";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { db } from "index";

export function me(app: FastifyInstance) {
  app.get('/me', { preHandler: app.auth }, async (request: FastifyRequest, reply: FastifyReply) => {
    if (!request.user?.id) {
      return reply.badRequest('Erro ao encontrar usuário!');
    }

    const user = await db.query.users.findFirst({ where: eq(users.id, Number(request.user.id)) });

    if (!user) {
      return reply.badRequest('Erro ao encontrar usuário!');
    }

    return reply.ok('Usuário encontrado!', user);
  });
}