import { FastifyInstance } from "fastify";
import { db } from "..";
import { projects } from "../db/schema";

export async function createProject(app: FastifyInstance) {
  app.post('/projects', async (request: any, reply: any) => {
    try {
      const { name, description } = request.body;

      await db.insert(projects).values({ name, description });

      return reply.status(201).send({ message: 'Projeto criado com sucesso!' });
    } catch (error) {
      console.log(error);
    }
  })
}