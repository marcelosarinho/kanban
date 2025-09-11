import { FastifyInstance } from "fastify";
import argon2 from 'argon2';
import { db } from "..";
import { users } from "../db/schema";

export async function createUser(app: FastifyInstance) {
  app.post('/users', async (request: any, reply: any) => {
    try {
      const { name, email, password } = request.body;

      const hashedPassword = await argon2.hash(password);

      await db.insert(users).values({ name, email, password: hashedPassword });

      return reply.status(201).send({ message: 'Usuário cadastrado com sucesso!' });
    } catch (error) {
      console.log(error);
    }
  })
}