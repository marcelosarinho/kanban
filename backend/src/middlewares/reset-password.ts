import dayjs from "dayjs";
import { db } from "..";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import { FastifyInstance } from "fastify";
import argon2 from 'argon2';

export default async function resetPasswordMiddleware(app: FastifyInstance) {
  app.get('/reset-password', async (request: any, reply: any) => {
    const { token, email } = request.query;

    const user = await db.query.users.findFirst({ where: eq(users.email, email) });

    if (!user) {
      return reply.status(404).send({ message: 'Usuário não encontrado!' });
    }

    if (user && user.forgotPasswordToken) {
      const tokenMatch = await argon2.verify(user.forgotPasswordToken, token);

      if (!tokenMatch) {
        return reply.status(401).send({ message: 'Token inválido!' });
      }
    }

    if (user && user.forgotPasswordTokenExpiry && dayjs().isAfter(dayjs.utc(user.forgotPasswordTokenExpiry))) {
      return reply.status(401).send({ message: 'Token expirado!' });
    }

    return reply.status(200).send({ message: 'Token válido!' });
  });
}