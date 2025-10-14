import fastify, { FastifyReply, FastifyRequest } from "fastify";
import cors from "@fastify/cors";
import { getProjects } from "./routes/get-projects";
import { createProject } from "./routes/create-project";
import { updateProject } from "./routes/update-project";
import { createTask } from "./routes/create-task";
import { updateTask } from "./routes/update-task";
import { deleteTask } from "./routes/delete-task";
import { deleteProject } from "./routes/delete-project";
import { createSubtask } from "./routes/create-subtask";
import { deleteSubtask } from "./routes/delete-subtask";
import { getTasks } from "./routes/get-tasks";
import { createUser } from "./routes/create-user";
import { forgotPassword } from "./routes/forgot-password";
import { login } from "./routes/login";
import { verifyResetPassword } from "./routes/verify-reset-password";
import { resetPassword } from "./routes/reset-password";
import cookie from "@fastify/cookie";
const server = fastify();

server.register(cors, {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
});

server.register(cookie, {
  secret: process.env.COOKIE_SECRET,
  hook: false,
})

server.decorateRequest('clientInfo', {
  getter() {
    return {
      ip: this.ip,
      userAgent: this.headers['user-agent'],
    }
  },
});

server.decorateReply('ok', function (this: FastifyReply, message: string, data?: unknown) {
  return this.status(200).send({
    message,
    data,
  });
});

server.decorateReply('created', function (this: FastifyReply, message: string) {
  return this.status(201).send({
    message,
  });
});

server.decorateReply('modified', function (this: FastifyReply, message: string) {
  return this.status(204).send({
    message,
  });
});

server.decorateReply('badRequest', function (this: FastifyReply, message: string) {
  return this.status(400).send({
    message,
  });
});

server.decorateReply('unauthorized', function (this: FastifyReply, message: string) {
  return this.status(401).send({
    message,
  });
});

server.decorateReply('notFound', function (this: FastifyReply, message: string ) {
  return this.status(404).send({
    message,
  });
});

server.decorateReply('conflict', function (this: FastifyReply, message: string) {
  return this.status(409).send({
    message,
  });
});

server.decorateReply('error', function (this: FastifyReply, message: string) {
  return this.status(500).send({
    message,
  });
});

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Server running at ${address}`)
});

server.register(getProjects);
server.register(createProject);
server.register(updateProject);
server.register(getTasks);
server.register(createTask);
server.register(updateTask);
server.register(deleteTask);
server.register(deleteProject);
server.register(createSubtask);
server.register(deleteSubtask);
server.register(createUser);
server.register(forgotPassword);
server.register(login);
server.register(verifyResetPassword);
server.register(resetPassword);