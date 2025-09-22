import { ThemeContext } from "@contexts/ThemeContext";
import { THEME_ICONS } from "@libs/constants";
import { useState, type ReactNode } from "react";
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

  function renderThemeIcon() {
    const Icon = THEME_ICONS[theme];
    return <Icon className="mr-2 text-xl" />
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, renderThemeIcon, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}