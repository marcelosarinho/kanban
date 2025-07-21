import { FastifyInstance } from "fastify";
import { db } from "..";
import { projects } from "../db/schema";
import { eq } from "drizzle-orm";

export async function deleteProject(app: FastifyInstance) {
  app.delete('/projects/:id', async (request: any, reply: any) => {
    try {
      const { id } = request.params;

      await db.delete(projects).where(eq(projects.id, id));

      return reply.status(200).send({ message: 'Projeto deletado com sucesso!' });
    } catch (error) {
      console.log(error);
    }
  });
}