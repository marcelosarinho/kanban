import { FastifyInstance } from "fastify";

export default async function resetPassword(app: FastifyInstance) {
  app.post('/reset-password', async (request: any, reply: any) => {
    console.log('reset password');
  })
}