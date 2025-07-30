import { FastifyInstance } from "fastify";
import { db } from "..";
import { ilike, or } from "drizzle-orm";
import { projects } from "../db/schema";

export async function getProjects(app: FastifyInstance) {
  app.get('/projects', async (request: any) => {
    try {
      const { search } = request.query;

      const where = search ? or(ilike(projects.name, `%${search}%`), ilike(projects.description, `%${search}%`)) : undefined;

      const results = await db.query.projects.findMany({
        where,
        with: {
          tasks: true,
        }
      });

      return results;
    } catch (error) {
      console.log(error);
    }
  })
}