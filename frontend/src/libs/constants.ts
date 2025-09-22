import type {
  CategoryItem,
  CategoryOption,
  ButtonOption,
  ThemeOption,
  Color,
} from "@custom-types/constants"
import type { TaskItem, TaskPriorityItem, TaskPriorityOption, TaskStatusOption } from "@custom-types/task"
import { MoonIcon, MoonStarsIcon, SunIcon } from "@phosphor-icons/react"

export const MAX_CATEGORIES_LENGTH = 2;

export const THEME_ICONS: Record<ThemeOption, React.ElementType> = {
  light: SunIcon,
  dark: MoonIcon,
  system: MoonStarsIcon,
}

export const THEME_ICONS_SIZE: Record<'sm' | 'lg', string> = {
  sm: 'text-xl',
  lg: 'text-2xl',
}

export const CATEGORIES: Record<CategoryOption, CategoryItem> = {
  frontend: { color: 'badge-blue', name: 'Front-end' },
  backend: { color: 'badge-green', name: 'Back-end' },
  mobile: { color: 'badge-red', name: 'Mobile' },
  ui_ux: { color: 'badge-purple', name: 'UI/UX' },
  devops: { color: 'badge-pink', name: 'DevOps' },
  database: { color: 'badge-orange', name: 'Banco de dados' },
  none: { color: 'badge-none', name: 'Sem categoria' },
}

export const BUTTON_VARIANTS: Record<ButtonOption, string> = {
  'primary': 'btn btn-primary',
  'danger': 'btn btn-danger',
  'success': 'btn btn-success',
  'info': 'btn btn-info',
  'outline-primary': 'btn btn-outline btn-outline-primary',
  'transparent': 'btn-transparent',
}

export const TASK_COLORS: Record<Color, TaskItem> = {
  blue: { bg: 'task-blue-background', border: 'task-blue-border', label: 'Azul' },
  red: { bg: 'task-red-background', border: 'task-red-border', label: 'Vermelho' },
  green: { bg: 'task-green-background', border: 'task-green-border', label: 'Verde' },
  yellow: { bg: 'task-yellow-background', border: 'task-yellow-border', label: 'Amarelo' },
  purple: { bg: 'task-purple-background', border: 'task-purple-border', label: 'Roxo' },
  pink: { bg: 'task-pink-background', border: 'task-pink-border', label: 'Rosa' },
  orange: { bg: 'task-orange-background', border: 'task-orange-border', label: 'Laranja' },
  none: { bg: 'task-none-background', border: 'task-none-border', label: 'Sem cor' },
}

export const TASK_PRIORITIES: Record<TaskPriorityOption, TaskPriorityItem> = {
  low: { color: 'badge-success', label: 'Baixa', dots: 1 },
  medium: { color: 'badge-warning', label: 'Média', dots: 2 },
  high: { color: 'badge-danger', label: 'Alta', dots: 3 },
}

export const TASK_STATUSES: Record<TaskStatusOption, string> = {
  todo: 'A fazer',
  in_progress: 'Em progresso',
  testing: 'Testando',
  implemented: 'Implementado',
}