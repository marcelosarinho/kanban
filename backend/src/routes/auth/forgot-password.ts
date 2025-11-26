import { FastifyInstance, FastifyReply } from "fastify";
import { db } from "index";
import { users } from "@db/schema";
import { and, eq } from "drizzle-orm";
import { sendForgotPasswordEmail } from "@utils/email";
import { generateToken } from "@routes/helpers/token";
import { createErrorLog } from "@routes/helpers/log";

interface ForgotPasswordBody {
  email: string
}

export async function forgotPassword(app: FastifyInstance) {
  app.post<{ Body: ForgotPasswordBody }>('/forgot-password', async (request, reply: FastifyReply) => {
    const { email } = request.body;

    try {
      const user = await db.query.users.findFirst({ where: and(eq(users.email, email), eq(users.verified, true)) });

      if (!user) {
        return reply.badRequest('Erro ao recuperar usuário!');
      }

      const { token, hashToken, expiry } = await generateToken(15, 'minutes');

      await db.update(users).set({
        forgotPasswordToken: hashToken,
        forgotPasswordTokenExpiry: expiry,
      }).where(eq(users.email, email));

      await sendForgotPasswordEmail({ name: user.name, email, token });

      return reply.ok('Email enviado com sucesso!');
    } catch (error) {
      createErrorLog(error as Error, request, reply);

      return reply.error('Ocorreu um erro ao enviar email! Por favor, tente novamente.');
    }
  });
};