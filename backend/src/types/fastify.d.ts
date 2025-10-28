import "fastify";

declare module "fastify" {
  interface FastifyInstance {
    auth: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }

  interface FastifyRequest {
    clientInfo: {
      ip?: string;
      userAgent?: string;
    };
    user?: {
      id: string;
      verified: boolean;
    }
  };

  interface FastifyReply {
    badRequest(message: string): this;
    unauthorized(message: string): this;
    notFound(message: string): this;
    conflict(message: string): this;
    error(message: string): this;
    ok(message: string, data?: unknown): this;
    created(message: string): this;
    modified(message: string): this;
  };
}