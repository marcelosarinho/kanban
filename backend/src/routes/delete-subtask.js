"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSubtask = deleteSubtask;
const __1 = require("..");
const schema_1 = require("../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
async function deleteSubtask(app) {
    app.delete('/projects/:id/tasks/:taskId/subtasks/:subtaskId', async (request, reply) => {
        try {
            const { subtaskId } = request.params;
            await __1.db.delete(schema_1.subtasks).where((0, drizzle_orm_1.eq)(schema_1.subtasks.id, subtaskId));
            return reply.status(200).send({ message: 'Subtarefa deletada com sucesso!' });
        }
        catch (error) {
            console.log(error);
        }
    });
}
