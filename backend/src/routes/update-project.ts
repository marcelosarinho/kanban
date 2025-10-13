import { FastifyInstance } from "fastify";
import { projects } from "@db/schema";
import { db } from "..";
import { eq, sql } from "drizzle-orm";

export async function updateProject(app: FastifyInstance) {
  app.put('/projects/:id', async (request: any, reply: any) => {
    try {
      const { id } = request.params;
      const { name, description } = request.body;

      await db.update(projects).set({ name, description, updatedAt: sql`NOW()` }).where(eq(projects.id, id));

      return reply.status(200).send({ message: 'Projeto atualizado com sucesso!' });
    } catch (error) {
      console.log(error);
    }
  })
}