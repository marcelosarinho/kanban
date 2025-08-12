import type { TaskStatusOption } from "../types/constants";

export async function createTask(status: TaskStatusOption, projectId?: string) {
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