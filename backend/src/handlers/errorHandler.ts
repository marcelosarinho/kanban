import { FastifyError, FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { createErrorLog } from "@routes/helpers/log";

export function setupErrorHandler(app: FastifyInstance) {
  app.setErrorHandler((error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
    createErrorLog(error, request);

    reply.error('Ocorreu um erro interno! Por favor, tente novamente.');
  });
}