"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSubtask = createSubtask;
const __1 = require("..");
const schema_1 = require("../db/schema");
async function createSubtask(app) {
    app.post('/projects/:id/tasks/:taskId/subtasks', async (request, reply) => {
        try {
            const { taskId } = request.params;
            const { name } = request.body;
            await __1.db.insert(schema_1.subtasks).values({
                name,
                done: false,
                taskId,
            });
            return reply.status(201).send({ message: 'Subtarefa criada com sucesso!' });
        }
        catch (error) {
            console.log(error);
        }
    });
}
