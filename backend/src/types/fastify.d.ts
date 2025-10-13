import "fastify";

declare module "fastify" {
  interface FastifyRequest {
    clientInfo: {
      ip?: string;
      userAgent?: string;
    };
  };

  interface FastifyReply {
    badRequest(message: string): this;
    unauthorized(message: string): this;
    notFound(message: string): this;
    unprocessableEntity(message: string): this;
    error(message: string): this;
    ok(message: string, data?: unknown): this;
    created(message: string): this;
    modified(message: string): this;
  };
}