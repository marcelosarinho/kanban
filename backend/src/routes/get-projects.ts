import { FastifyInstance } from "fastify";
import { db } from "..";

export async function getProjects(app: FastifyInstance) {
  app.get('/projects', async (request) => {
    try {
      const projects = await db.query.projects.findMany({
        with: {
          tasks: true,
        }
      });

      return projects;
    } catch (error) {
      console.log(error);
    }
  })
}