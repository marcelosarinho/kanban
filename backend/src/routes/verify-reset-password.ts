import { FastifyInstance } from "fastify";
import dayjs from "@lib/dayjs";
import { db } from "..";
import { users } from "@db/schema";
import { eq } from "drizzle-orm";
import argon2 from 'argon2';

export async function verifyResetPassword(app: FastifyInstance) {
  app.get('/verify-reset-password', async (request: any, reply: any) => {
    const { token, email } = request.query;

    if (!token || !email) {
      return reply.badRequest('Token ou email não informados! Informe um token e email.');
    }

    const user = await db.query.users.findFirst({ where: eq(users.email, email) });

    if (!user) {
      return reply.notFound('Usuário não encontrado! Crie uma conta.');
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

    return reply.ok('Token válido!');
  });
}