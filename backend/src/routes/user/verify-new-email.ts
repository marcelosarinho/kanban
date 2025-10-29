import { users } from "@db/schema";
import { eq } from "drizzle-orm";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { db } from "index";
import argon2 from "argon2";

export async function verifyNewEmail(app: FastifyInstance) {
  app.post<{ Body: { email: string, token: string } }>('/verify-new-email', async (request, reply: FastifyReply) => {
    const { id } = request.user!;
    const { email, token } = request.body;

    if (!id || !email || !token) {
      return reply.badRequest('Erro ao verificar novo email!');
    }

    const user = await db.query.users.findFirst({ where: eq(users.id, Number(id)) });

    if (!user) {
      return reply.notFound('Usuário não encontrado!');
    }

    if (user.email === email) {
      return reply.badRequest('Email já verificado!');
    }

    if (user.pendingEmail !== email) {
      return reply.badRequest('Email não encontrado!');
    }

    if (!user.pendingEmailToken) {
      return reply.badRequest('Token ausente!');
    }

    const isValidToken = await argon2.verify(user.pendingEmailToken, token);

    if (!isValidToken) {
      return reply.badRequest('Token inválido!');
    }

    
  });
}