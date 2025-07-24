"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTask = updateTask;
const __1 = require("..");
const schema_1 = require("../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
async function updateTask(app) {
    app.patch('/projects/:id/tasks/:taskId', async (request, reply) => {
        try {
            const { taskId } = request.params;
            const data = request.body;
            await __1.db.update(schema_1.tasks).set(Object.assign(Object.assign({}, data), { updatedAt: (0, drizzle_orm_1.sql) `NOW()` })).where((0, drizzle_orm_1.eq)(schema_1.tasks.id, taskId));
            return reply.status(200).send({ message: 'Tarefa atualizada com sucesso!' });
        }
        catch (error) {
            console.log(error);
        }
    });
}
