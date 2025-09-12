import { FastifyInstance } from "fastify";
import argon2 from 'argon2';
import { db } from "..";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import { randomBytes } from "crypto";

export async function createUser(app: FastifyInstance) {
  app.post('/users', async (request: any, reply: any) => {
    try {
      const { name, email, password } = request.body;

      const user = await db.query.users.findFirst({ where: eq(users.email, email) });

      if (user && user.verified) {
        return reply.status(400).send({ message: 'Usuário já cadastrado!' });
      }

      if (user && !user.verified) {
        if (user.verifyTokenExpiry && new Date(user.verifyTokenExpiry).getTime() < new Date().getTime()) {
          const newVerifyToken = randomBytes(64).toString('hex');
          const newVerifyTokenExpiry = new Date(Date.now() + 60 * 60 * 24 * 1000);

          await db.update(users).set({ verifyToken: newVerifyToken, verifyTokenExpiry: newVerifyTokenExpiry.toISOString() }).where(eq(users.email, user.email));
        }

        return reply.status(200).send({ message: 'Enviado email de verificação!' });
      }

      const hashedPassword = await argon2.hash(password);
      const verifyToken = randomBytes(64).toString('hex');
      const verifyTokenExpiry = new Date(Date.now() + 60 * 60 * 24 * 1000);

      await db.insert(users).values({ name, email, password: hashedPassword, verifyToken, verifyTokenExpiry: verifyTokenExpiry.toISOString() });

      return reply.status(201).send({ message: 'Usuário cadastrado com sucesso!' });
    } catch (error) {
      console.log(error);
    }
  })
}