import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { db } from "..";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import argon2 from 'argon2';
import { checkLoginVerification } from "./helpers/authenticate";

interface AuthenticateBody {
  email: string;
  password: string;
}

export async function authenticate(app: FastifyInstance) {
  app.post<{ Body: AuthenticateBody }>('/authenticate', async (request, reply: FastifyReply) => {
    const { email, password } = request.body;
    const ip = request.clientInfo.ip;
    const userAgent = request.clientInfo.userAgent;

    if (!email || !password) {
      return reply.missingCredentials();
    }

    const user = await db.query.users.findFirst({ where: eq(users.email, email) });

    if (!user) {
      return reply.invalidCredentials();
    }

    // const { status, reason } = checkLoginVerification(user, ip)
    checkLoginVerification(user, ip);

    if (!user.verified) {
      return reply.invalidCredentials();
    }

    const isPasswordValid = await argon2.verify(user.password, password);

    if (!isPasswordValid) {
      return reply.invalidCredentials();
    }

    return reply.ok('Login realizado com sucesso!');
  })
}