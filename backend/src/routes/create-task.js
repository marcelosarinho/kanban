"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTask = createTask;
const __1 = require("..");
const schema_1 = require("../db/schema");
async function createTask(app) {
    app.post('/projects/:id/tasks', async (request, reply) => {
        try {
            const { id } = request.params;
            const { status } = request.body;
            await __1.db.insert(schema_1.tasks).values({
                projectId: id,
                status,
                name: 'Nova tarefa',
                description: 'Descrição da nova tarefa',
                priority: 'low',
                progress: 0,
                done: false,
            });
            return reply.status(201).send({ message: 'Tarefa criada com sucesso!' });
        }
        catch (error) {
            console.log(error);
        }
    });
}
