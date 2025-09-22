import { createContext, useContext } from "react";
import type { ThemeOption } from "../types/constants";

const ThemeContext = createContext<ThemeOption | null>(null);

export function useTheme() {
  return useContext(ThemeContext);
}