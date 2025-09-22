import { ThemeContext } from "@contexts/ThemeContext";
import { useState, type ReactNode } from "react";
import type { ThemeOption } from "types/constants";

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeOption>("system");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}