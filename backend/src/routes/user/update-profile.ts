import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export function updateProfile(app: FastifyInstance) {
  app.patch<{ Body: { name: string; email: string } }>(
    '/profile',
    async (request, reply: FastifyReply) => {
    const { name, email } = request.body;

    if (!name && !email) {
      return reply.badRequest('Nome ou email obrigatório!');
    }

    
  })
}