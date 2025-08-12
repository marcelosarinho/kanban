import type { CategoryOption, Color, TaskPriorityOption, TaskStatusOption } from "./constants";

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