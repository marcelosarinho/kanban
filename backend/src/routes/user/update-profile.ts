import { users } from "@db/schema";
import { sendUpdateProfileEmail } from "@utils/email";
import { randomBytes } from "crypto";
import { eq } from "drizzle-orm";
import { FastifyInstance, FastifyReply } from "fastify";
import { db } from "index";
import argon2 from 'argon2';
import dayjs from "@lib/dayjs";

export function updateProfile(app: FastifyInstance) {
  app.patch<{ Body: { name: string; email: string } }>(
    '/update-profile',
    { preHandler: app.auth },
    async (request, reply: FastifyReply) => {
    const { name, email } = request.body;
    const { id } = request.user!;

    if (!id) {
      return reply.badRequest('Erro ao encontrar usuário!');
    }

    if (!name && !email) {
      return reply.badRequest('Nome ou email obrigatório!');
    }

    try {
      const user = await db.query.users.findFirst({ where: eq(users.id, Number(id)) });

      if (!user) {
        return reply.badRequest('Erro ao encontrar usuário!');
      }

      if (email !== user.email) {
        const userByEmail = await db.query.users.findFirst({ where: eq(users.email, email) });

        if (userByEmail) {
          return reply.badRequest('Erro ao atualizar email!');
        }

        const pendingEmailToken = randomBytes(64).toString('hex');
        const pendingEmailTokenExpiry = dayjs.utc().add(1, 'hour').format();
        const hashPendingEmailToken = await argon2.hash(pendingEmailToken);

        await sendUpdateProfileEmail(name, email, user.email, pendingEmailToken);

        await db.update(users).set({ pendingEmail: email, pendingEmailToken: hashPendingEmailToken, pendingEmailTokenExpiry }).where(eq(users.id, Number(id)));
      }

      await db.update(users).set({ name }).where(eq(users.id, Number(id)));

      return reply.ok('Perfil atualizado com sucesso!');
    } catch (error) {
      return reply.error('Erro ao atualizar perfil!');
    }
  })
}