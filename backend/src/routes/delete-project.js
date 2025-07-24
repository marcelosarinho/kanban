"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProject = deleteProject;
const __1 = require("..");
const schema_1 = require("../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
async function deleteProject(app) {
    app.delete('/projects/:id', async (request, reply) => {
        try {
            const { id } = request.params;
            await __1.db.delete(schema_1.projects).where((0, drizzle_orm_1.eq)(schema_1.projects.id, id));
            return reply.status(200).send({ message: 'Projeto deletado com sucesso!' });
        }
        catch (error) {
            console.log(error);
        }
    });
}
