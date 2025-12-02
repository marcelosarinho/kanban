import type { Subtask } from "@custom-types/subtask";
import { api } from ".";
import type { Task } from "@custom-types/task";

export async function createSubtask({ name }: Pick<Subtask, 'name'>, { id: taskId }: Pick<Task, 'id'>) {
  return api.post<{ data: Subtask }>(`/tasks/${taskId}/subtasks`, { name }, { credentials: 'include' });
}

export async function updateSubtask({ id }: Pick<Subtask, 'id'>) {
  return api.patch<{ data: Subtask }>(`/subtasks/${id}`, { credentials: 'include' });
}

export async function deleteSubtask({ id }: Pick<Subtask, 'id'>) {
  return api.delete<{ data: Subtask }>(`/subtasks/${id}`, { credentials: 'include' });
}