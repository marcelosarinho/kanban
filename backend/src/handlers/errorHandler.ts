import { FastifyInstance } from "fastify";
import { createErrorLog } from "@routes/helpers/log";

export function setupErrorHandler(app: FastifyInstance) {
  app.setErrorHandler((error, request, reply) => {
    createErrorLog(error as Error, request, reply);

    reply.error('Ocorreu um erro interno! Por favor, tente novamente.');
  });
}