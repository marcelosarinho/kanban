import { FastifyInstance } from "fastify";
import argon2 from 'argon2';
import { db } from "..";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import { randomBytes } from "crypto";
import dayjs from "../lib/dayjs";

export async function createUser(app: FastifyInstance) {
  app.post('/users', async (request: any, reply: any) => {
    try {
      const { name, email, password } = request.body;

      const user = await db.query.users.findFirst({ where: eq(users.email, email) });

      if (user && user.verified) {
        return reply.status(400).send({ message: 'Usuário já cadastrado!' });
      }

      if (user && !user.verified) {
        if (user.verifyTokenExpiry && dayjs().isAfter(dayjs.utc(user.verifyTokenExpiry))) {
          const newVerifyToken = randomBytes(64).toString('hex');
          const newVerifyTokenExpiry = dayjs.utc().add(1, 'day').format();

          await db.update(users).set({ verifyToken: newVerifyToken, verifyTokenExpiry: newVerifyTokenExpiry }).where(eq(users.email, user.email));
        }

        return reply.status(200).send({ message: 'Enviado email de verificação!' });
      }

      const hashedPassword = await argon2.hash(password);
      const verifyToken = randomBytes(64).toString('hex');
      const verifyTokenExpiry = dayjs.utc().add(1, 'day').format();

      await db.insert(users).values({ name, email, password: hashedPassword, verifyToken, verifyTokenExpiry });

      return reply.status(201).send({ message: 'Usuário cadastrado com sucesso!' });
    } catch (error) {
      console.log(error);
    }
  })
}