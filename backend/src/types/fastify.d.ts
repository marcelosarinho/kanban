import "fastify";

declare module "fastify" {
  interface FastifyRequest {
    clientInfo: {
      ip?: string;
      userAgent?: string;
    };
  };

  interface FastifyReply {
    missingCredentials(message?: string): this;
    invalidCredentials(message?: string): this;
    ok(message: string): this;
    created(message: string): this;
  }
}