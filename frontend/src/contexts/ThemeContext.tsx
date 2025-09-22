import React, { createContext, useContext } from "react";
import type { ThemeOption } from "../types/constants";

type ThemeContextType = {
  theme: ThemeOption;
  setTheme: React.Dispatch<React.SetStateAction<ThemeOption>>;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: "system",
  setTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}