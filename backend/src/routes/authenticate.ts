import { FastifyInstance } from "fastify";
import { db } from "..";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import argon2 from 'argon2';
import { checkLoginVerification } from "./helpers/authenticate";

export async function authenticate(app: FastifyInstance) {
  app.post('/authenticate', async (request: any, reply: any) => {
    const { email, password } = request.body;
    const ip = request.headers['x-forwarded-for'] || request.ip;

    if (!email || !password) {
      return reply.status(400).send({ message: 'Email e senha são obrigatórios!' });
    }

    const user = await db.query.users.findFirst({ where: eq(users.email, email) });

    if (!user) {
      return reply.status(404).send({ message: 'Usuário não encontrado!' });
    }

    const { status, reason } = checkLoginVerification(user, ip)

    if (!user.verified) {
      return reply.status(401).send({ message: 'Usuário não verificado!' });
    }

    const isPasswordValid = await argon2.verify(user.password, password);

    if (!isPasswordValid) {
      return reply.status(401).send({ message: 'Usuário ou senha incorretos!' })
    }

    return reply.status(200).send({ message: 'Login realizado com sucesso!' });
  })
}