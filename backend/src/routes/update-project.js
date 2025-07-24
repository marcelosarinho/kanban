"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProject = updateProject;
const schema_1 = require("../db/schema");
const __1 = require("..");
const drizzle_orm_1 = require("drizzle-orm");
async function updateProject(app) {
    app.put('/projects/:id', async (request, reply) => {
        try {
            const { id } = request.params;
            const { name, description } = request.body;
            await __1.db.update(schema_1.projects).set({ name, description, updatedAt: (0, drizzle_orm_1.sql) `NOW()` }).where((0, drizzle_orm_1.eq)(schema_1.projects.id, id));
            return reply.status(200).send({ message: 'Projeto atualizado com sucesso!' });
        }
        catch (error) {
            console.log(error);
        }
    });
}
