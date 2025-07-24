"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = deleteTask;
const __1 = require("..");
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../db/schema");
async function deleteTask(app) {
    app.delete('/projects/:id/tasks/:taskId', async (request, reply) => {
        try {
            const { taskId } = request.params;
            await __1.db.delete(schema_1.tasks).where((0, drizzle_orm_1.eq)(schema_1.tasks.id, taskId));
            return reply.status(200).send({ message: 'Tarefa deletada com sucesso!' });
        }
        catch (error) {
            console.log(error);
        }
    });
}
