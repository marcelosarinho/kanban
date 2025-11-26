import { FastifyInstance, FastifyReply } from "fastify";
import dayjs from "@lib/dayjs";
import { db } from "index";
import { users } from "@db/schema";
import { eq } from "drizzle-orm";
import argon2 from 'argon2';
import { createErrorLog } from "@routes/helpers/log";

interface VerifyResetPasswordQuery {
  token: string;
  email: string;
}

export async function verifyResetPassword(app: FastifyInstance) {
  app.get<{ Querystring: VerifyResetPasswordQuery }>('/verify-reset-password', async (request, reply: FastifyReply) => {
    const { token, email } = request.query;

    if (!token || !email) {
      return reply.badRequest('Token ou email não informados! Informe um token e email.');
    }

    try {
      const user = await db.query.users.findFirst({ where: eq(users.email, email) });

      if (!user) {
        return reply.badRequest('Erro ao recuperar usuário!');
      }

      if (!user.forgotPasswordToken || !user.forgotPasswordTokenExpiry) {
        return reply.unauthorized('Token inválido! Forneça um token válido.');
      }

      const tokenMatch = await argon2.verify(user.forgotPasswordToken, token);

      if (!tokenMatch) {
        return reply.unauthorized('Token inválido! Forneça um token válido.');
      }

      if (dayjs().isAfter(dayjs.utc(user.forgotPasswordTokenExpiry))) {
        return reply.unauthorized('Token expirado! Forneça um token válido.');
      }

      return reply.ok('Token válido!', true);
    } catch (error) {
      createErrorLog(error as Error, request, reply);

      return reply.error('Ocorreu um erro ao verificar token! Por favor, tente novamente.');
    }
  });
}