import { FastifyInstance } from "fastify";
import { db } from "..";
import { desc, ilike, or } from "drizzle-orm";
import { projects } from "@db/schema";

export async function getProjects(app: FastifyInstance) {
  app.get('/projects', async (request: any, reply: any) => {
    try {
      const { search } = request.query;

      const where = search ? or(ilike(projects.name, `%${search}%`), ilike(projects.description, `%${search}%`)) : undefined;

      const results = await db.query.projects.findMany({
        where,
        orderBy: [desc(projects.createdAt)],
      });

      return reply.status(200).send(results);
    } catch (error) {
      console.log(error);
    }
  })
}