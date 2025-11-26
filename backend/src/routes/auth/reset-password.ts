import { FastifyInstance, FastifyReply } from "fastify";
import { db } from "index";
import { eq } from "drizzle-orm";
import { users } from "@db/schema";
import argon2 from 'argon2';
import dayjs from "@lib/dayjs";

interface ResetPasswordBody {
  token: string;
  email: string;
  password: string;
}

export async function resetPassword(app: FastifyInstance) {
  app.post<{ Body: ResetPasswordBody }>('/reset-password', async (request, reply: FastifyReply) => {
    const { token, email, password } = request.body;

    if (!token || !email) {
      return reply.badRequest('Token ou email não informados! Informe um token e email.');
    }

    if (!password) {
      return reply.badRequest('Senha não informada! Informe uma senha.');
    }

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

    const hashPassword = await argon2.hash(password);

    await db.update(users).set({
      password: hashPassword,
      forgotPasswordToken: null,
      forgotPasswordTokenExpiry: null,
    }).where(eq(users.email, email));

    return reply.ok('Senha redefinida com sucesso!');
  })
}