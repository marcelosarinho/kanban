import fastify, { FastifyReply, FastifyRequest } from "fastify";
import cors from "@fastify/cors";
import { getProjects } from "@routes/project/get-projects";
import { createProject } from "@routes/project/create-project";
import { updateProject } from "@routes/project/update-project";
import { createTask } from "@routes/task/create-task";
import { updateTask } from "@routes/task/update-task";
import { deleteTask } from "@routes/task/delete-task";
import { deleteProject } from "@routes/project/delete-project";
import { createSubtask } from "@routes/subtask/create-subtask";
import { deleteSubtask } from "@routes/subtask/delete-subtask";
import { getTasks } from "@routes/task/get-tasks";
import { createUser } from "@routes/user/create-user";
import { forgotPassword } from "@routes/auth/forgot-password";
import { login } from "@routes/auth/login";
import { verifyResetPassword } from "@routes/auth/verify-reset-password";
import { resetPassword } from "@routes/auth/reset-password";
import cookie from "@fastify/cookie";
import auth from "@middlewares/auth";
import verifyDevice from "@routes/auth/verify-device";
import { authenticate } from "@routes/auth/authenticate";
import { logout } from "@routes/auth/logout";
import { verifyEmail } from "@routes/auth/verify-email";
import { updateProfile } from "@routes/user/update-profile";
import { updatePassword } from "@routes/user/update-password";
import { me } from "@routes/user/me";
const server = fastify();

server.register(cors, {
  origin: process.env.WEB_BASE_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
});

server.register(cookie, {
  secret: process.env.COOKIE_SECRET,
});

server.register(auth);

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
server.register(resetPassword);
server.register(login);
server.register(logout);
server.register(verifyResetPassword);
server.register(verifyDevice);
server.register(verifyEmail);
server.register(authenticate);
server.register(updateProfile);
server.register(updatePassword);
server.register(me);