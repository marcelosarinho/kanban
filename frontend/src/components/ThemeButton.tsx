import { MoonIcon, MoonStarsIcon, SunIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { useTheme } from "@contexts/ThemeContext";

export default function ThemeButton({ className }: { className?: string }) {
  const { changeTheme, renderThemeIcon } = useTheme();

  const [themeDropdown, setThemeDropdown] = useState(false);

  return (
    <div className={className}>
      <button onClick={() => setThemeDropdown(!themeDropdown)} className="flex items-center justify-center cursor-pointer hover:bg-gray-200 dark:hover:bg-slate-800 rounded-full p-1">
        {renderThemeIcon()}
      </button>
      {themeDropdown && (
        <div className="absolute right-0 bg-white rounded-md mt-2 p-2 w-28 text-sm border border-gray-300 dark:bg-slate-900 dark:border-slate-700 dark:text-gray-300 select-none">
          <div onClick={() => changeTheme('dark')} className="rounded px-2 py-1 flex items-center hover:bg-gray-100 cursor-pointer dark:hover:bg-slate-800">
            <MoonIcon className="mr-2 text-xl" />
            Escuro
          </div>
          <div onClick={() => changeTheme('light')} className="rounded px-2 py-1 flex items-center hover:bg-gray-100 cursor-pointer dark:hover:bg-slate-800">
            <SunIcon className="mr-2 text-xl" />
            Claro
          </div>
          <div onClick={() => changeTheme('system')} className="rounded px-2 py-1 flex items-center hover:bg-gray-100 cursor-pointer dark:hover:bg-slate-800">
            <MoonStarsIcon className="mr-2 text-xl" />
            Sistema
          </div>
        </div>
      )}
    </div>
  )
}