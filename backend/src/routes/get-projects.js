"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjects = getProjects;
async function getProjects(app) {
    app.get('/projects', async (request) => {
        return 'Oi';
    });
}
