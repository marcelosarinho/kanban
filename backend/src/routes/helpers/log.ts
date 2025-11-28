import { actionLogs, errorLogs } from "@db/schema";
import { FastifyError, FastifyRequest } from "fastify";
import { db } from "index";
import { Action } from "@lib/constants";

export async function createErrorLog(error: FastifyError, request: FastifyRequest) {
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

export async function createActionLog(action: Action, request: FastifyRequest, tx: typeof db, description?: string) {
  const { user } = request;

  await tx.insert(actionLogs).values({
    action,
    userId: user?.id ? Number(user.id) : undefined,
    description,
    context: request.body,
  });
}