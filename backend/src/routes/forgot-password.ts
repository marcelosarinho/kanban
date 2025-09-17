import { FastifyInstance } from "fastify";
import { db } from "..";
import { users } from "../db/schema";
import { and, eq } from "drizzle-orm";

export async function forgotPassword(app: FastifyInstance) {
  app.post('/forgot-password', async (request: any, reply: any) => {
    try {
      const { email } = request.body;

      const user = await db.query.users.findFirst({ where: and(eq(users.email, email), eq(users.verified, true)) });

      if (!user) {
        return reply.status(404).send({ message: 'Não foi possível encontrar um usuário com esse email!' });
      }

      return reply.status(200).send({ message: 'Email enviado com sucesso!' });
    } catch (error) {
      console.log(error);
    }
  })
}