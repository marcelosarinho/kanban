import { FastifyInstance, FastifyReply } from "fastify";
import argon2 from 'argon2';
import { db } from "index";
import { users } from "@db/schema";
import { eq } from "drizzle-orm";
import { sendVerificationEmail } from "@utils/email";
import { generateToken } from "@routes/helpers/token";

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

    const user = await db.query.users.findFirst({ where: eq(users.email, email) });

    if (user && user.verified) {
      return reply.conflict('Usuário já cadastrado!');
    }

    const { token, hashToken, expiry } = await generateToken(1, 'days');

    if (!user) {
      const hashedPassword = await argon2.hash(password);

      await db.insert(users).values({ name, email, password: hashedPassword, verifyToken: hashToken, verifyTokenExpiry: expiry });
    }

    if (user && !user.verified) {
      await db.update(users).set({ verifyToken: hashToken, verifyTokenExpiry: expiry }).where(eq(users.email, user.email));
    }

    await sendVerificationEmail({ name, email, token });

    return reply.created('Usuário cadastrado com sucesso!');
  })
}