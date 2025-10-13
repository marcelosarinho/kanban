import { FastifyInstance } from "fastify";
import { db } from "..";
import { users } from "@db/schema";
import { and, eq } from "drizzle-orm";
import { randomBytes } from "crypto";
import dayjs from "@lib/dayjs";
import argon2 from 'argon2';
import { sendForgotPasswordEmail } from "@utils/email";

export async function forgotPassword(app: FastifyInstance) {
  app.post('/forgot-password', async (request: any, reply: any) => {
    const { email } = request.body;

    const user = await db.query.users.findFirst({ where: and(eq(users.email, email), eq(users.verified, true)) });

    if (!user) {
      return reply.status(404).send({ message: 'Não foi possível encontrar um usuário com esse email!' });
    }

    const forgotPasswordToken = randomBytes(64).toString('hex');
    const forgotPasswordTokenExpiry = dayjs.utc().add(15, 'minute').format();
    const hashForgotPasswordToken = await argon2.hash(forgotPasswordToken);

    await db.update(users).set({
      forgotPasswordToken: hashForgotPasswordToken,
      forgotPasswordTokenExpiry,
    }).where(eq(users.email, email));

    await sendForgotPasswordEmail({ name: user.name, email, token: forgotPasswordToken });

    return reply.status(200).send({ message: 'Email enviado com sucesso!' });
  });
};