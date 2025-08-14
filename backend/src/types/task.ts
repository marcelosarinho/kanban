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
export type CategoryOption = 'frontend' | 'backend' | 'mobile' | 'ui_ux' | 'devops' | 'database';
export type TaskStatusOption = 'todo' | 'in_progress' | 'testing' | 'implemented';
export type Color = 'blue' | 'red' | 'green' | 'yellow' | 'purple' | 'pink' | 'orange' | 'none';