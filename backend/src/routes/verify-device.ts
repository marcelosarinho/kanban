import { users } from "@db/schema";
import { eq } from "drizzle-orm";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { db } from "index";

interface VerifyDeviceBody {
  email: string;
  code: string;
}

export default async function verifyDevice(app: FastifyInstance) {
  app.post<{ Body: VerifyDeviceBody }>('/verify-device', async (request, reply: FastifyReply) => {
    const { email, code } = request.body;

    if (!email || !code) {
      return reply.badRequest('Email e código são obrigatórios!');
    }

    const user = await db.query.users.findFirst({ where: eq(users.email, email) });

    // if (!user) {
    //   return reply.
    // }
  });
}