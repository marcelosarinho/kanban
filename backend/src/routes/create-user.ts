import { FastifyInstance } from "fastify";

export async function createUser(app: FastifyInstance) {
  app.post('/users', async (request: any, reply: any) => {
    try {
      const { name, email, password } = request.body;

    } catch (error) {
      console.log(error);
    }
  })
}