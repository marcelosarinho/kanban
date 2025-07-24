"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const get_projects_1 = require("./routes/get-projects");
const create_project_1 = require("./routes/create-project");
const update_project_1 = require("./routes/update-project");
const create_task_1 = require("./routes/create-task");
const update_task_1 = require("./routes/update-task");
const delete_task_1 = require("./routes/delete-task");
const delete_project_1 = require("./routes/delete-project");
const create_subtask_1 = require("./routes/create-subtask");
const delete_subtask_1 = require("./routes/delete-subtask");
const server = (0, fastify_1.default)();
server.register(cors_1.default, {
    origin: "*",
});
server.listen({ port: 8080 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server running at ${address}`);
});
server.register(get_projects_1.getProjects);
server.register(create_project_1.createProject);
server.register(update_project_1.updateProject);
server.register(create_task_1.createTask);
server.register(update_task_1.updateTask);
server.register(delete_task_1.deleteTask);
server.register(delete_project_1.deleteProject);
server.register(create_subtask_1.createSubtask);
server.register(delete_subtask_1.deleteSubtask);
