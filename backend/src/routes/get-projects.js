"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjects = getProjects;
const __1 = require("..");
async function getProjects(app) {
    app.get('/projects', async (request) => {
        try {
            const projects = await __1.db.query.projects.findMany({
                with: {
                    tasks: true,
                }
            });
            return projects;
        }
        catch (error) {
            console.log(error);
        }
    });
}
