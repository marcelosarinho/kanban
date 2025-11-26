import { users } from "@db/schema";
import { eq } from "drizzle-orm";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { db } from "index";
import { createErrorLog } from "@routes/helpers/log";

export async function deleteUser(app: FastifyInstance) {
  app.delete('/delete-user', { preHandler: app.auth }, async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.user!;

    if (!id) {
      return reply.badRequest('Erro ao deletar usuário!');
    }

    try {
      await db.delete(users).where(eq(users.id, Number(id)));

      return reply.ok('Usuário deletado com sucesso!');
    } catch (error) {
      createErrorLog(error as Error, request, reply);

      return reply.error('Erro ao deletar usuário!');
    }
  })
}