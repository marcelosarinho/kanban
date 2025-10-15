import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export async function logout(app: FastifyInstance) {
  app.post('/logout', { preHandler: [app.auth] }, async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      reply.clearCookie('auth');

      reply.ok('Logout realizado com sucesso!');
    } catch (error) {
      reply.error('Erro ao realizar logout!');
    }
  })
}