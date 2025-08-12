import { FastifyInstance } from "fastify";
import { db } from "..";
import { eq } from "drizzle-orm";
import { tasks } from "../db/schema";

export async function getTasks(app: FastifyInstance) {
  app.get('/projects/:id/tasks', async (request: any, reply: any) => {
    try {
      const { id } = request.params;

      const results = await db.select().from(tasks).where(eq(tasks.projectId, id)).groupBy(tasks.status);

      return reply.status(200).send(results);
    } catch (error) {
      console.log(error);
    }
  })
}