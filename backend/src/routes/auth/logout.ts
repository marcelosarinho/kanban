import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { db } from "index";
import { eq } from "drizzle-orm";
import { users } from "@db/schema";
import { createErrorLog } from "@routes/helpers/log";

export async function logout(app: FastifyInstance) {
  app.post('/logout', { preHandler: [app.auth] }, async (request: FastifyRequest, reply: FastifyReply) => {
    const token = request.user;

    if (!token) {
      return reply.unauthorized('Token ausente!');
    }

    try {
      const user = await db.query.users.findFirst({ where: eq(users.id, Number(token.id)) });

      if (!user) {
        return reply.unauthorized('Usuário não encontrado!');
      }

      await db.update(users).set({
        tokenVersion: token.token_version + 1,
      }).where(eq(users.id, Number(token.id)));

      reply.clearCookie('auth');

      reply.ok('Logout realizado com sucesso!');
    } catch (error) {
      createErrorLog(error as Error, request, reply);

      reply.error('Erro ao realizar logout!');
    }
  })
}