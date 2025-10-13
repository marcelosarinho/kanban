import { FastifyInstance, FastifyReply } from "fastify";
import { db } from "..";
import { users } from "@db/schema";
import { eq } from "drizzle-orm";
import argon2 from 'argon2';
import { checkLoginVerification } from "./helpers/login";

interface LoginBody {
  email: string;
  password: string;
}

export async function login(app: FastifyInstance) {
  app.post<{ Body: LoginBody }>('/login', async (request, reply: FastifyReply) => {
    const { email, password } = request.body;
    const ip = request.clientInfo.ip;
    const userAgent = request.clientInfo.userAgent;

    if (!email || !password) {
      return reply.badRequest('Email e senha são obrigatórios!');
    }

    const user = await db.query.users.findFirst({ where: eq(users.email, email) });

    if (!user) {
      return reply.unauthorized('Email ou senha inválidos!');
    }

    // const { status, reason } = checkLoginVerification(user, ip)
    checkLoginVerification(user, { ip, userAgent });

    if (!user.verified) {
      return reply.unauthorized('Email ou senha inválidos!');
    }

    const isPasswordValid = await argon2.verify(user.password, password);

    if (!isPasswordValid) {
      return reply.unauthorized('Email ou senha inválidos!');
    }

    return reply.ok('Login realizado com sucesso!');
  })
}