import type { Project } from "../types/project";
import type { TaskStatusOption } from "../types/task";

export async function getTasks(projectId?: Pick<Project, 'id'>) {
  if (!projectId) {
    console.error('Projeto não encontrado!');
    return;
  }

  try {
    const response = await fetch(`http://localhost:8080/projects/${projectId}/tasks`);

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function createTask(status: TaskStatusOption, projectId?: Pick<Project, 'id'>) {
  if (!projectId) {
    console.error('Projeto não encontrado!');
    return;
  }

  try {
    const response = await fetch(`http://localhost:8080/projects/${projectId}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status }),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Erro ao criar tarefa!', error);
  }
}

export async function updateTask(params: any, projectId?: Pick<Project, 'id'>) {
  if (!projectId) {
    console.log('Projeto não encontrado!');
    return;
  }

  try {
    const response = await fetch(`http://localhost:8080/projects/${projectId}/tasks/${params.taskId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ body: params.body }),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}