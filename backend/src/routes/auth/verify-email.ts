import { eq } from "drizzle-orm";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { db } from "index";
import { users } from "@db/schema";
import argon2 from "argon2";
import dayjs from "@lib/dayjs";
import { createErrorLog } from "@routes/helpers/log";

interface VerifyEmailBody {
  email: string;
  token: string;
}

export async function verifyEmail(app: FastifyInstance) {
  app.post<{ Body: VerifyEmailBody }>("/verify-email", async (request, reply: FastifyReply) => {
    const { email, token } = request.body;

    if (!email || !token) {
      return reply.badRequest('Email e token são obrigatórios!');
    }

    try {
      const user = await db.query.users.findFirst({ where: eq(users.email, email) });

      if (!user) {
        return reply.notFound('Usuário não encontrado!');
      }

      if (!user.verifyToken || !user.verifyTokenExpiry) {
        return reply.badRequest('Token de verificação inválido!');
      }

      if (user.verified) {
        return reply.conflict('Usuário já verificado!');
      }

      const isTokenValid = await argon2.verify(user.verifyToken, token);
      const isTokenExpired = dayjs.utc().isAfter(user.verifyTokenExpiry);

      if (!isTokenValid) {
        return reply.badRequest('Token de verificação inválido!');
      }

      if (isTokenExpired) {
        return reply.badRequest('Token de verificação expirado!');
      }

      await db.update(users).set({
        verified: true,
        verifyToken: null,
        verifyTokenExpiry: null,
      }).where(eq(users.id, user.id));

      return reply.ok('Email verificado com sucesso!');
    } catch (error) {
      createErrorLog(error as Error, request, reply);

      return reply.error('Erro ao verificar email!');
    }
  })
}