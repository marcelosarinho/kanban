import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export async function authenticate(app: FastifyInstance) {
  app.get('/authenticate', { preHandler: app.auth }, async (request: FastifyRequest, reply: FastifyReply) => {
    return reply.ok('Usuário autenticado!', request.user);
  })
}