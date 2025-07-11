import fastify from "fastify";
import cors from "@fastify/cors";

const server = fastify();
server.register(cors, {
    origin: "*",
});

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Server running at ${address}`)
});

server.get("/ping", () => {
  return { message: "pong" };
});