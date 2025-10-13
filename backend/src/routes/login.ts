import { FastifyInstance, FastifyReply } from "fastify";
import { db } from "..";
import { users } from "@db/schema";
import { eq } from "drizzle-orm";
import argon2 from 'argon2';
import { checkLoginVerification } from "./helpers/login";
import { randomInt } from "crypto";
import { sendLoginVerificationEmail } from "@utils/email";
import dayjs from "dayjs";

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

    if (!user.verified) {
      return reply.unauthorized('Email ou senha inválidos!');
    }

    const isPasswordValid = await argon2.verify(user.password, password);

    if (!isPasswordValid) {
      return reply.unauthorized('Email ou senha inválidos!');
    }

    const { deviceStatus, reason } = checkLoginVerification(user, { ip, userAgent });

    if (deviceStatus === "unverified") {
      const code = randomInt(0, 1_000_000).toString().padStart(6, '0');
      const hashedCode = await argon2.hash(code);

      await db.update(users).set({
        verifyLoginToken: hashedCode,
        verifyLoginTokenExpiry: dayjs.utc().add(10, 'minute').format(),
      })

      await sendLoginVerificationEmail({ name: user.name, email }, code);

      return reply.ok('Dispositivo não verificado!', { deviceStatus, reason });
    }

    return reply.ok('Login realizado com sucesso!', { deviceStatus, reason });
  })
}