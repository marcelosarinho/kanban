import type { Project } from "@custom-types/project";
import type { Task, TaskStatusOption } from "@custom-types/task";

export async function getTasks({ id }: Pick<Project, 'id'>) {
  if (!id) {
    console.error('Projeto não encontrado!');
    return;
  }

  try {
    const response = await fetch(`http://localhost:8080/projects/${id}/tasks`);

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function createTask(status: TaskStatusOption, { id }: Pick<Project, 'id'>) {
  if (!id) {
    console.error('Projeto não encontrado!');
    return;
  }

  try {
    const response = await fetch(`http://localhost:8080/projects/${id}/tasks`, {
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

export async function updateTask(task: Task, project?: Pick<Project, 'id'>) {
  if (!project?.id) {
    console.log('Projeto não encontrado!');
    return;
  }

  try {
    const response = await fetch(`http://localhost:8080/projects/${project.id}/tasks/${task.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}