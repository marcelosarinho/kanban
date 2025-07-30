import type { Project } from "../types/project";

export async function getProjectsApi() {
  try {
    const response = await fetch('http://localhost:8080/projects');
    return await response.json();
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

export async function deleteProject(id: string) {
  try {
    if (!id) {
      console.error('Projeto não encontrado!');
      return;
    }

    await fetch(`http://localhost:8080/projects/${id}`, {
      method: 'DELETE',
    })

    return true;
  } catch (error) {
    console.error('Erro ao deletar projeto!', error);
    return false;
  }
}

export async function updateProject(project: Project) {
  try {
    const response = await fetch(`http://localhost:8080/projects/${project.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(project)
    })

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Erro ao atualizar projeto!', error);
  }
}

export async function searchProject(search: string) {
  try {
    const response = await fetch(`http://localhost:8080/projects/search?search=${search}`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Erro ao buscar projetos!', error);
  }
}