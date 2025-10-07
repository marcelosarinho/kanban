import { FastifyInstance } from "fastify";
import dayjs from "dayjs";
import { db } from "..";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import argon2 from 'argon2';

export default async function verifyResetPassword(app: FastifyInstance) {
  app.get('/verify-reset-password', async (request: any, reply: any) => {
    const { token, email } = request.query;

    if (!token || !email) {
      return reply.status(400).send({ message: 'Token ou email não informados! Informe um token e email.' });
    }

    const user = await db.query.users.findFirst({ where: eq(users.email, email) });

    if (!user) {
      return reply.status(404).send({ message: 'Usuário não encontrado! Crie uma conta.' });
    }

    if (user && user.forgotPasswordToken) {
      const tokenMatch = await argon2.verify(user.forgotPasswordToken, token);

      if (!tokenMatch) {
        return reply.status(401).send({ message: 'Token inválido! Forneça um token válido.' });
      }
    }

    if (user && user.forgotPasswordTokenExpiry && dayjs().isAfter(dayjs.utc(user.forgotPasswordTokenExpiry))) {
      return reply.status(401).send({ message: 'Token expirado! Forneça um token válido.' });
    }

    return reply.status(200).send({ message: 'Token válido!' });
  });
}