import fastify from "fastify";
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

const server = fastify();
server.register(cors, {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
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