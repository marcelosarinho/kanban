import { ThemeContext } from "@contexts/ThemeContext";
import { useEffect, useState, type ReactNode } from "react";
import type { ThemeOption } from "types/constants";
import { setCookie } from "@utils/functions";
import { getCookie } from "@utils/functions";

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeOption>(getCookie('theme') as ThemeOption || 'system');

  function changeTheme(selectedTheme: ThemeOption) {
    setCookie('theme', selectedTheme);
    document.documentElement.classList.toggle('dark', selectedTheme === 'dark' || selectedTheme === 'system' && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setTheme(selectedTheme);
  }

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark' || theme === 'system' && window.matchMedia("(prefers-color-scheme: dark)").matches);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}