import type { Project } from "@custom-types/project";
import type { Task, TaskStatusOption } from "@custom-types/task";
import { api } from ".";

export async function getTasks({ id }: Pick<Project, 'id'>) {
  return api.get<{ data: Task[] }>(`/projects/${id}/tasks`, { credentials: 'include' });
}

export async function createTask(status: TaskStatusOption, { id }: Pick<Project, 'id'>) {
  return api.post<{ data: Task }>(`/projects/${id}/tasks`, { status }, { credentials: 'include' });
}

export async function updateTask(task: Task) {
  return api.patch<{ data: Task }>(`/tasks/${task.id}`, task, { credentials: 'include' });
}

export async function deleteTask({ id }: Pick<Task, 'id'>) {
  return api.delete<{ data: Task }>(`/tasks/${id}`, { credentials: 'include' });
}