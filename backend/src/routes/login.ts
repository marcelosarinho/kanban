import { FastifyInstance } from "fastify";
import { db } from "..";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import argon2 from 'argon2';

export async function login(app: FastifyInstance) {
  app.post('/login', async (request: any, reply: any) => {
    try {
      const { email, password } = request.body;

      const user = await db.select().from(users).where(eq(users.email, email));

      const isPasswordValid = await argon2.verify(user[0].password, password)

      console.log(isPasswordValid);

      return reply.status(200).send({ message: 'Login realizado com sucesso!' });
    } catch (error) {
      console.log(error);
    }
  })
}