export const THEME_ICONS = {
  light: 'ph-sun',
  dark: 'ph-moon',
  system: 'ph-moon-stars',
}

export const CATEGORIES = {
  frontend: { color: 'badge-blue', name: 'Front-end' },
  backend: { color: 'badge-green', name: 'Back-end' },
  mobile: { color: 'badge-red', name: 'Mobile' },
  ui_ux: { color: 'badge-purple', name: 'UI/UX' },
  devops: { color: 'badge-pink', name: 'DevOps' },
  database: { color: 'badge-orange', name: 'Banco de dados' },
}

export const BUTTON_VARIANTS = {
  'primary': 'btn btn-primary',
  'danger': 'btn btn-danger',
  'success': 'btn btn-success',
  'info': 'btn btn-info',
  'outline-primary': 'btn btn-outline btn-outline-primary',
  'transparent': 'btn-transparent',
}

export const TASK_COLORS = {
  blue: { bg: 'task-blue-background', border: 'task-blue-border', label: 'Azul' },
  red: { bg: 'task-red-background', border: 'task-red-border', label: 'Vermelho' },
  green: { bg: 'task-green-background', border: 'task-green-border', label: 'Verde' },
  yellow: { bg: 'task-yellow-background', border: 'task-yellow-border', label: 'Amarelo' },
  purple: { bg: 'task-purple-background', border: 'task-purple-border', label: 'Roxo' },
  pink: { bg: 'task-pink-background', border: 'task-pink-border', label: 'Rosa' },
  orange: { bg: 'task-orange-background', border: 'task-orange-border', label: 'Laranja' },
  none: { bg: 'task-none-background', border: 'task-none-border', label: 'Sem cor' },
}

export const TASK_PRIORITIES = {
  low: { color: 'badge-success', label: 'Baixa', dots: 1 },
  medium: { color: 'badge-warning', label: 'Média', dots: 2 },
  high: { color: 'badge-danger', label: 'Alta', dots: 3 },
}

export const TASK_STATUSES = {
  todo: 'A fazer',
  in_progress: 'Em progresso',
  testing: 'Testando',
  implemented: 'Implementado',
}