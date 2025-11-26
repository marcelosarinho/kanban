import { actionLogs, errorLogs } from "@db/schema";
import { FastifyReply, FastifyRequest } from "fastify";
import { db } from "index";
import { Action } from "@lib/constants";

export async function createErrorLog(error: Error, request: FastifyRequest, reply: FastifyReply) {
  const { user } = request;

  await db.insert(errorLogs).values({
    message: error.message,
    stacktrace: error.stack,
    route: request.url,
    method: request.method,
    context: request.body ?? {},
    userId: user?.id ? Number(user.id) : undefined,
  });
}

export async function createActionLog(action: Action, request: FastifyRequest, reply: FastifyReply, description?: string) {
  const { user } = request;

  await db.insert(actionLogs).values({
    action,
    userId: user?.id ? Number(user.id) : undefined,
    description,
    context: request.body,
  });
}