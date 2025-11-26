import { users } from "@db/schema";
import { eq } from "drizzle-orm";
import { FastifyInstance, FastifyReply } from "fastify";
import { db } from "index";
import argon2 from 'argon2';

export function updatePassword(app: FastifyInstance) {
  app.patch<{ Body: { oldPassword: string; newPassword: string, confirmPassword: string } }>(
    '/update-password',
    { preHandler: app.auth },
    async (request, reply: FastifyReply) => {
      const { oldPassword, newPassword, confirmPassword } = request.body;
      const { id } = request.user!;

      if (!id) {
        return reply.badRequest('Erro ao encontrar usuário!');
      }

      if (!oldPassword || !newPassword || !confirmPassword) {
        return reply.badRequest('Senha antiga, nova senha e confirmação de senha são obrigatórias!');
      }

      if (confirmPassword !== newPassword) {
        return reply.badRequest('As senhas não coincidem!');
      }

      const user = await db.query.users.findFirst({ where: eq(users.id, Number(id)) });

      if (!user) {
        return reply.badRequest('Erro ao encontrar usuário!');
      }

      const isPasswordValid = await argon2.verify(user.password, oldPassword);

      if (!isPasswordValid) {
        return reply.badRequest('Senha antiga inválida!');
      }

      const hashedPassword = await argon2.hash(newPassword);

      await db.update(users).set({ password: hashedPassword }).where(eq(users.id, Number(id)));

      return reply.ok('Senha atualizada com sucesso!');
    }
  );
}