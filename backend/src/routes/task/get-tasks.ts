import { FastifyInstance } from "fastify";
import { db } from "index";
import { eq } from "drizzle-orm";
import { tasks } from "@db/schema";
import { Task, TaskStatusOption } from "@custom-types/task";
import { FastifyReply } from "fastify";
import { createErrorLog } from "@routes/helpers/log";

interface GetTasksParams {
  id: string;
}

export async function getTasks(app: FastifyInstance) {
  app.get<{ Params: GetTasksParams }>('/projects/:id/tasks', async (request, reply: FastifyReply) => {
    const { id } = request.params;

    if (!id) {
      return reply.badRequest('ID do projeto não informado!');
    }

    const statuses: Record<TaskStatusOption, Task[]> = {
      todo: [],
      in_progress: [],
      testing: [],
      implemented: [],
    };

    try {
      const results = await db.select().from(tasks).where(eq(tasks.projectId, Number(id)));

      const groupedTasks = results.reduce((acc, task) => {
        if (!acc[task.status]) {
          acc[task.status] = [];
        }

        acc[task.status].push(task as unknown as Task);
        return acc;
      }, statuses);

      return reply.ok('Tarefas listadas com sucesso!', groupedTasks);
    } catch (error) {
      createErrorLog(error as Error, request, reply);

      return reply.error('Ocorreu um erro ao listar tarefas! Por favor, tente novamente.');
    }
  })
}