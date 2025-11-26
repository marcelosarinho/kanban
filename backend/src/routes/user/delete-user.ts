import { users } from "@db/schema";
import { eq } from "drizzle-orm";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { db } from "index";

export async function deleteUser(app: FastifyInstance) {
  app.delete('/delete-user', { preHandler: app.auth }, async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.user!;

    if (!id) {
      return reply.badRequest('Erro ao deletar usuário!');
    }

    await db.delete(users).where(eq(users.id, Number(id)));

    return reply.ok('Usuário deletado com sucesso!');
  })
}