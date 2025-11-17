import fp from "fastify-plugin";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import jwt from 'jsonwebtoken';
import { db } from "index";
import { eq } from "drizzle-orm";
import { users } from "@db/schema";

interface AuthPayload {
  id: string;
  name: string;
  email: string;
  verified: boolean;
  token_version: number;
}

function auth(app: FastifyInstance) {
  app.decorate('auth', async (request: FastifyRequest, reply: FastifyReply) => {
    const token = request.cookies.auth || request.headers.authorization?.split(" ")[1];

    if (!token) {
      return reply.unauthorized('Token ausente!');
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);

      if (typeof decoded === 'string')  {
        return reply.unauthorized('Token inválido!');
      }

      const user = await db.query.users.findFirst({ where: eq(users.id, decoded.id) });

      if (!user) {
        return reply.unauthorized('Usuário não encontrado!');
      }

      if (user.tokenVersion !== decoded.token_version) {
        return reply.unauthorized('Token inválido!');
      }

      request.user = decoded as AuthPayload;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return reply.unauthorized('Token expirado!');
      }

      return reply.unauthorized('Token inválido!');
    }
  })
}

export default fp(auth);