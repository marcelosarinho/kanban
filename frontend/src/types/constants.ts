export type CategoryOption = 'frontend' | 'backend' | 'mobile' | 'ui_ux' | 'devops' | 'database';

export type CategoryItem = {
  color: string;
  name: string;
}

export type ThemeOption = 'light' | 'dark' | 'system';
export type ThemeIcon = 'ph-sun' | 'ph-moon' | 'ph-moon-stars';

export type ButtonOption = 'primary' | 'danger' | 'success' | 'info' | 'outline-primary' | 'transparent';

export type Color = 'blue' | 'red' | 'green' | 'yellow' | 'purple' | 'pink' | 'orange' | 'none';

export type TaskItem = {
  bg: string;
  border: string;
  label: string;
}

export type TaskPriorityOption = 'low' | 'medium' | 'high';
export type TaskPriorityItem = {
  color: string;
  label: string;
  dots: number;
}

export type TaskStatusOption = 'todo' | 'in_progress' | 'testing' | 'implemented';