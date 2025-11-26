import { users } from "@db/schema";
import { eq } from "drizzle-orm";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { db } from "index";
import argon2 from "argon2";
import dayjs from "@lib/dayjs";
import { createErrorLog } from "@routes/helpers/log";

export async function verifyNewEmail(app: FastifyInstance) {
  app.post<{ Body: { email: string, token: string } }>('/verify-new-email', { preHandler: app.auth }, async (request, reply: FastifyReply) => {
    const { id } = request.user!;
    const { email, token } = request.body;

    if (!id || !email || !token) {
      return reply.badRequest('Erro ao verificar novo email!');
    }

    try {
      const user = await db.query.users.findFirst({ where: eq(users.id, Number(id)) });

      if (!user) {
        return reply.notFound('Usuário não encontrado!');
      }

      if (user.email === email) {
        return reply.badRequest('Email já verificado! Forneça um email diferente.');
      }

      if (user.pendingEmail !== email) {
        return reply.badRequest('Email não encontrado! Forneça um email válido.');
      }

      if (!user.pendingEmailToken || !user.pendingEmailTokenExpiry) {
        return reply.badRequest('Token inválido! Forneça um token válido.');
      }

      const isValidToken = await argon2.verify(user.pendingEmailToken, token);

      if (!isValidToken) {
        return reply.badRequest('Token inválido! Forneça um token válido.');
      }

      if (dayjs().isAfter(dayjs.utc(user.pendingEmailTokenExpiry))) {
        return reply.badRequest('Token expirado! Forneça um token válido.');
      }

      await db.update(users).set({
        email: user.pendingEmail,
        pendingEmail: null,
        pendingEmailToken: null,
        pendingEmailTokenExpiry: null,
      }).where(eq(users.id, Number(id)));

      return reply.ok('Novo email verificado com sucesso!');
    } catch (error) {
      createErrorLog(error as Error, request, reply);

      return reply.error('Erro ao verificar novo email!');
    }
  });
}