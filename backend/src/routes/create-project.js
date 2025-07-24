"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProject = createProject;
const __1 = require("..");
const schema_1 = require("../db/schema");
async function createProject(app) {
    app.post('/projects', async (request, reply) => {
        try {
            const { name, description } = request.body;
            await __1.db.insert(schema_1.projects).values({ name, description });
            return reply.status(201).send({ message: 'Projeto criado com sucesso!' });
        }
        catch (error) {
            console.log(error);
        }
    });
}
