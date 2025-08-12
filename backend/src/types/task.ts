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

export type UpdateTaskName = Pick<Task, 'id' | 'name'>;
export type UpdateTaskDescription = Pick<Task, 'id' | 'description'>;
export type UpdateTaskPriority = Pick<Task, 'id' | 'priority'>;
export type UpdateTaskCategory = Pick<Task, 'id' | 'category'>;
export type UpdateTaskCommentary = Pick<Task, 'id' | 'commentary'>;
export type UpdateTaskColor = Pick<Task, 'id' | 'color'>;
export type UpdateTaskDone = Pick<Task, 'id' | 'done'>;
export type UpdateTaskStatus = Pick<Task, 'id' | 'status'>;

export type TaskPriorityOption = 'low' | 'medium' | 'high';
export type CategoryOption = 'frontend' | 'backend' | 'mobile' | 'ui_ux' | 'devops' | 'database';
export type TaskStatusOption = 'todo' | 'in_progress' | 'testing' | 'implemented';
export type Color = 'blue' | 'red' | 'green' | 'yellow' | 'purple' | 'pink' | 'orange' | 'none';