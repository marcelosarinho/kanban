import { FastifyInstance } from "fastify";
import { db } from "..";
import { eq } from "drizzle-orm";
import { tasks } from "../db/schema";
import { Task, TaskStatusOption } from "../types/task";

export async function getTasks(app: FastifyInstance) {
  app.get('/projects/:id/tasks', async (request: any, reply: any) => {
    try {
      const { id } = request.params;

      const results = await db.select().from(tasks).where(eq(tasks.projectId, id));

      const groupedTasks = results.reduce((acc, task) => {
        if (!acc[task.status]) {
          console.log(task.status);
          acc[task.status] = [];
        }

        acc[task.status].push(task as unknown as Task);
        return acc;
      }, {} as Record<TaskStatusOption, Task[]>);

      return reply.status(200).send(groupedTasks);
    } catch (error) {
      console.log(error);
    }
  })
}