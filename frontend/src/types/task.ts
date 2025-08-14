import type { CategoryOption, Color } from "./constants";

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

export type TaskPriorityOption = 'low' | 'medium' | 'high';
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