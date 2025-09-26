import type { CategoryOption, Color } from "@custom-types/constants";
import type { TASK_PRIORITIES } from "@libs/constants";

export type Task = {
  id: string;
  name: string;
  description?: string;
  priority: TaskPriorityOption;
  category?: CategoryOption;
  progress: number;
  commentary?: string;
  color?: Color;
  done: boolean;
  status: TaskStatusOption;
  createdAt: string;
  updatedAt: string;
  projectId: string;
}

export type TaskPriorityOption = keyof typeof TASK_PRIORITIES;
export type TaskStatusOption = 'todo' | 'in_progress' | 'testing' | 'implemented';

export type TaskItem = {
  bg: string;
  border: string;
  label: string;
}

export type TaskPriorityItem = {
  color: string;
  label: string;
  dots: number;
}