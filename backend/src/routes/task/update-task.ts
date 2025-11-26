import { FastifyInstance } from "fastify";
import { db } from "index";
import { tasks } from "@db/schema";
import { eq, sql } from "drizzle-orm";
import { FastifyReply } from "fastify";
import { TaskPriorityOption, TaskStatusOption } from "@custom-types/task";

interface UpdateTaskBody {
  name: string;
  description: string;
  priority: TaskPriorityOption;
  progress: number;
  done: boolean;
  status: TaskStatusOption;
}

interface UpdateTaskParams {
  taskId: number;
}

export async function updateTask(app: FastifyInstance) {
  app.patch<{ Params: UpdateTaskParams, Body: UpdateTaskBody }>(
    '/projects/:id/tasks/:taskId',
    async (request, reply: FastifyReply) => {
    const { taskId } = request.params;
    const data = request.body;

    if (!taskId) {
      return reply.badRequest('ID da tarefa não informado!');
    }

    await db.update(tasks).set({
      ...data,
      updatedAt: sql`NOW()`
    }).where(eq(tasks.id, taskId));

    return reply.modified('Tarefa atualizada com sucesso!');
  })
}