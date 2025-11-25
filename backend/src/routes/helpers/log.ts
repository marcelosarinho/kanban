import { errorLogs } from "@db/schema";
import { FastifyReply, FastifyRequest } from "fastify";
import { db } from "index";

export async function createErrorLog(error: Error, request: FastifyRequest, reply: FastifyReply) {
  const { user } = request;

  type DebugErrorLogs = typeof errorLogs;

  await db.insert(errorLogs).values({
    message: error.message,
    stacktrace: error.stack,
    route: request.url,
    method: request.method,
    context: request.body ?? {},
    userId: Number(user?.id) ?? undefined,
  });
}