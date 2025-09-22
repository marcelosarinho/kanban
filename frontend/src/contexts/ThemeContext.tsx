import { createContext, useContext } from "react";
import type { ThemeOption } from "@custom-types/constants";

type ThemeContextType = {
  theme: ThemeOption;
  changeTheme: (selectedTheme: ThemeOption) => void;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

export function useTheme() {
  const ctx = useContext(ThemeContext);

  if (!ctx) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
  }

  return ctx;
}