import { users } from "@db/schema";
import { sendUpdateProfileEmail } from "@utils/email";
import { and, eq, ne, or } from "drizzle-orm";
import { FastifyInstance, FastifyReply } from "fastify";
import { db } from "index";
import { generateToken } from "@routes/helpers/token";

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

    const result = await db.transaction(async (tx) => {
      const user = await tx.query.users.findFirst({ where: eq(users.id, Number(id)) });

      if (!user) {
        return reply.badRequest('Erro ao encontrar usuário!');
      }

      let pendingEmailInfo: {
        name: string;
        email: string;
        oldEmail: string;
        token: string;
      } | null = null;

      if (email !== user.email) {
        const userByEmail = await tx.query.users.findFirst({
          where: and(
            or(eq(users.email, email), eq(users.pendingEmail, email)),
            ne(users.id, Number(id))
          ),
        });

        if (userByEmail) {
          return reply.badRequest('Erro ao atualizar email!');
        }

        const { token, hashToken, expiry } = await generateToken(1, 'hours');

        await tx.update(users).set({
          pendingEmail: email,
          pendingEmailToken: hashToken,
          pendingEmailTokenExpiry: expiry,
        }).where(eq(users.id, Number(id)));

        pendingEmailInfo = {
          name,
          email,
          oldEmail: user.email,
          token,
        }
      }

      await tx.update(users).set({ name }).where(eq(users.id, Number(id)));

      return pendingEmailInfo;
    });

    if (result) {
      const { name, email, oldEmail, token } = result;
      await sendUpdateProfileEmail(name, email, oldEmail, token);
    }

    return reply.ok('Perfil atualizado com sucesso!', { pendingEmail: result?.email });
  })
}