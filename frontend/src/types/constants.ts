import type { BUTTON_VARIANTS, CATEGORIES, TASK_COLORS } from "@libs/constants";

export type CategoryOption = keyof typeof CATEGORIES;

export type CategoryItem = {
  color: string;
  name: string;
}

export type ThemeOption = 'light' | 'dark' | 'system';
export type ThemeIcon = 'ph-sun' | 'ph-moon' | 'ph-moon-stars';
export type ButtonOption = keyof typeof BUTTON_VARIANTS;
export type Color = keyof typeof TASK_COLORS;