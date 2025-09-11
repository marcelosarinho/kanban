import { FastifyInstance } from "fastify";
import { db } from "..";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";

export async function forgotPassword(app: FastifyInstance) {
  app.post('/forgot-password', async (request: any, reply: any) => {
    try {
      const { email } = request.body;

      const user = await db.select().from(users).where(eq(users.email, email));

      console.log(user);

      return reply.status(200).send({ message: 'Email enviado com sucesso!' });
    } catch (error) {
      console.log(error);
    }
  })
}