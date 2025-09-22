import { useState } from "react";
import { useTheme } from "@contexts/ThemeContext";
import ThemeIcon from "./ThemeIcon";

export default function ThemeButton({ className }: { className?: string }) {
  const { changeTheme, theme } = useTheme();

  const [themeDropdown, setThemeDropdown] = useState(false);

  return (
    <div className={className}>
      <button onClick={() => setThemeDropdown(!themeDropdown)} className="flex items-center justify-center cursor-pointer hover:bg-gray-200 dark:hover:bg-slate-800 rounded-full p-1">
        <ThemeIcon theme={theme} size="lg" />
      </button>
      {themeDropdown && (
        <div className="absolute right-0 bg-white rounded-md mt-2 p-2 w-28 text-sm border border-gray-300 dark:bg-slate-900 dark:border-slate-700 dark:text-gray-300 select-none animate-dropdown">
          <div onClick={() => changeTheme('dark')} className="rounded px-2 py-1 flex items-center hover:bg-gray-100 cursor-pointer dark:hover:bg-slate-800 gap-2">
            <ThemeIcon theme="dark" size="sm" />
            Escuro
          </div>
          <div onClick={() => changeTheme('light')} className="rounded px-2 py-1 flex items-center hover:bg-gray-100 cursor-pointer dark:hover:bg-slate-800 gap-2">
            <ThemeIcon theme="light" size="sm" />
            Claro
          </div>
          <div onClick={() => changeTheme('system')} className="rounded px-2 py-1 flex items-center hover:bg-gray-100 cursor-pointer dark:hover:bg-slate-800 gap-2">
            <ThemeIcon theme="system" size="sm" />
            Sistema
          </div>
        </div>
      )}
    </div>
  )
}