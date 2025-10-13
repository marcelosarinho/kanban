import { FastifyInstance, FastifyReply } from "fastify";
import argon2 from 'argon2';
import { db } from "..";
import { users } from "@db/schema";
import { eq } from "drizzle-orm";
import { randomBytes } from "crypto";
import dayjs from "@lib/dayjs";
import { sendVerificationEmail } from "@utils/email";

interface CreateUserBody {
  name: string;
  email: string;
  password: string;
}

export async function createUser(app: FastifyInstance) {
  app.post<{ Body: CreateUserBody }>('/users', async (request, reply: FastifyReply) => {
    const { name, email, password } = request.body;

    if (!name || !email || !password) {
      return reply.badRequest('Nome, email e senha são obrigatórios!');
    }

    try {
      const user = await db.query.users.findFirst({ where: eq(users.email, email) });

      if (user && user.verified) {
        return reply.unprocessableEntity('Erro ao cadastrar usuário!');
      }

      const verifyToken = randomBytes(64).toString('hex');
      const verifyTokenExpiry = dayjs.utc().add(1, 'day').format();
      const hashVerifyToken = await argon2.hash(verifyToken);

      if (!user) {
        const hashedPassword = await argon2.hash(password);

        await db.insert(users).values({ name, email, password: hashedPassword, verifyToken: hashVerifyToken, verifyTokenExpiry });
      }

      if (user && !user.verified) {
        await db.update(users).set({ verifyToken: hashVerifyToken, verifyTokenExpiry }).where(eq(users.email, user.email));
      }

      await sendVerificationEmail({ name, email, verifyToken });

      return reply.created('Usuário cadastrado com sucesso!');
    } catch (error) {
      console.log(error);

      return reply.error('Ocorreu um erro ao cadastrar usuário! Por favor, tente novamente.');
    }
  })
}