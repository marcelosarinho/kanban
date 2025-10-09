import { FastifyInstance } from "fastify";
import { db } from "..";
import { eq } from "drizzle-orm";
import { users } from "../db/schema";
import argon2 from 'argon2';
import dayjs from "../lib/dayjs";

export async function resetPassword(app: FastifyInstance) {
  app.post('/reset-password', async (request: any, reply: any) => {
    const { token, email, password } = request.body;

    if (!token || !email) {
      return reply.status(400).send({ message: 'Token ou email não informados! Informe um token e email.' });
    }

    const user = await db.query.users.findFirst({ where: eq(users.email, email) });

    if (!user) {
      return reply.status(404).send({ message: 'Usuário não encontrado!' });
    }

    if (!user.forgotPasswordToken || !user.forgotPasswordTokenExpiry) {
      return reply.status(401).send({ message: 'Token inválido! Forneça um token válido.' });
    }

    const tokenMatch = await argon2.verify(user.forgotPasswordToken, token);

    if (!tokenMatch) {
      return reply.status(401).send({ message: 'Token inválido! Forneça um token válido.' });
    }

    if (dayjs().isAfter(dayjs.utc(user.forgotPasswordTokenExpiry))) {
      return reply.status(401).send({ message: 'Token expirado! Forneça um token válido.' });
    }

    const hashPassword = await argon2.hash(password);

    await db.update(users).set({
      password: hashPassword,
      forgotPasswordToken: null,
      forgotPasswordTokenExpiry: null,
    }).where(eq(users.email, email));

    return reply.status(200).send({ message: 'Senha redefinida com sucesso!' });
  })
}