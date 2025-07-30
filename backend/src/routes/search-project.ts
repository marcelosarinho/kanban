import { FastifyInstance } from "fastify";
import { db } from "..";
import { projects } from "../db/schema";
import { ilike, or } from "drizzle-orm";

export async function searchProject(app: FastifyInstance) {
  app.get('/projects/search', async (request: any, reply: any) => {
    try {
      const results = await db.select().from(projects).where(or(ilike(projects.name, `%${request.query.search}%`), ilike(projects.description, `%${request.query.search}%`)));

      return reply.status(200).send(results);
    } catch (error) {
      console.log(error);
    }
  })
}