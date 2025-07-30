import type { Project } from "../types/project";

export async function getProjects() {
  try {
    const response = await fetch('http://localhost:8080/projects');
    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Erro ao buscar projetos!', error);
  }
}

export async function createProject(project: Project) {
  try {
    const response = await fetch('http://localhost:8080/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(project)
    })

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Erro ao criar projeto!', error);
  }
}