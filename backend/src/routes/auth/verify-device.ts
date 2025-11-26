import { users } from "@db/schema";
import { eq } from "drizzle-orm";
import { FastifyInstance, FastifyReply } from "fastify";
import { db } from "index";
import argon2 from 'argon2';
import dayjs from "@lib/dayjs";
import { getDeviceSignature } from "../helpers/login";

interface VerifyDeviceBody {
  code: string;
}

export default async function verifyDevice(app: FastifyInstance) {
  app.post<{ Body: VerifyDeviceBody }>('/verify-device', { preHandler: app.auth }, async (request, reply: FastifyReply) => {
    const { code } = request.body;
    const token = request.user;
    const { ip, userAgent } = request.clientInfo;

    if (!token) {
      return reply.unauthorized('Token ausente!');
    }

    if (!code) {
      return reply.badRequest('Código é obrigatório!');
    }

    const user = await db.query.users.findFirst({ where: eq(users.id, Number(token.id)) });

    if (!user) {
      return reply.badRequest('Erro ao verificar dispositivo!');
    }

    if (!user.verifyLoginToken || !user.verifyLoginTokenExpiry) {
      return reply.badRequest('Erro ao verificar dispositivo!');
    }

    const isCodeValid = await argon2.verify(user.verifyLoginToken, code);

    if (!isCodeValid) {
      return reply.unauthorized('Código inválido!');
    }

    if (dayjs().isAfter(dayjs.utc(user.verifyLoginTokenExpiry))) {
      return reply.unauthorized('Código expirado! Forneça um código válido.')
    }

    const today = dayjs.utc().format();

    const deviceSignature = getDeviceSignature(userAgent);

    await db.update(users).set({
      verifyLoginToken: null,
      verifyLoginTokenExpiry: null,
      firstLoginVerify: true,
      lastVerifiedLogin: today,
      deviceInfo: {
        ip,
        userAgent,
        signature: deviceSignature,
      }
    }).where(eq(users.id, user.id));

    reply.ok('Dispositivo verificado com sucesso!');
  });
}