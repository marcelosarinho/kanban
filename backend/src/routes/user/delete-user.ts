import { users } from "@db/schema";
import { createActionLog } from "@routes/helpers/log";
import { eq } from "drizzle-orm";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { db } from "index";

export async function deleteUser(app: FastifyInstance) {
  app.delete('/delete-user', { preHandler: app.auth }, async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.user!;

    if (!id) {
      return reply.badRequest('Erro ao excluir usuário!');
    }

    const user = await db.select().from(users).where(eq(users.id, Number(id)));

    if (!user) {
      return reply.notFound('Usuário não encontrado!');
    }

    await db.transaction(async (tx) => {
      await db.delete(users).where(eq(users.id, Number(id)));

      await createActionLog('delete', request, tx, `Usuário de ID ${id} excluiu a conta`);
    });

    const token = crypto.randomUUID();

    return reply.ok('Usuário excluído com sucesso!', { token });
  })
}