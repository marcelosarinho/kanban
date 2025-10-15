import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export async function me(app: FastifyInstance) {
  app.get('/me', { preHandler: app.auth }, async (request: FastifyRequest, reply: FastifyReply) => {
    return reply.ok('Usuário autenticado!', request.user);
  })
}