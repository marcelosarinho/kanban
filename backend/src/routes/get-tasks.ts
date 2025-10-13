import { FastifyInstance } from "fastify";
import { db } from "..";
import { eq } from "drizzle-orm";
import { tasks } from "@db/schema";
import { Task, TaskStatusOption } from "@custom-types/task";

export async function getTasks(app: FastifyInstance) {
  app.get('/projects/:id/tasks', async (request: any, reply: any) => {
    try {
      const { id } = request.params;

      const results = await db.select().from(tasks).where(eq(tasks.projectId, id));

      const statuses: Record<TaskStatusOption, Task[]> = {
        todo: [],
        in_progress: [],
        testing: [],
        implemented: [],
      };

      const groupedTasks = results.reduce((acc, task) => {
        if (!acc[task.status]) {
          acc[task.status] = [];
        }

        acc[task.status].push(task as unknown as Task);
        return acc;
      }, statuses);

      return reply.status(200).send(groupedTasks);
    } catch (error) {
      console.log(error);
    }
  })
}