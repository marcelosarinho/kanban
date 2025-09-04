import { MoonIcon, MoonStarsIcon, SunIcon } from "@phosphor-icons/react";
import { useRef, useState } from "react";
import { getCookie, removeCookie, setCookie } from "../utils/functions";

const themeIcons: { [key: string]: string } = {
  light: 'ph-sun',
  dark: 'ph-moon',
  system: 'ph-moon-stars',
}

export default function ThemeButton({ className }: { className?: string }) {
  const [themeDropdown, setThemeDropdown] = useState(false);

  const themeIconRef = useRef<HTMLElement>(null);

  const theme = getCookie('theme');
  changeIconTheme(themeIcons[theme || 'system']);
  document.documentElement.classList.toggle('dark', theme === 'dark' || !theme && window.matchMedia("(prefers-color-scheme: dark)").matches);

  function changeTheme(selectedTheme: string) {
    changeIconTheme(themeIcons[selectedTheme]);

    if (selectedTheme === 'dark' || selectedTheme === 'light') {
      setCookie('theme', selectedTheme);
      document.documentElement.classList.toggle('dark', selectedTheme === 'dark');
      return;
    }

    removeCookie('theme');
    document.documentElement.classList.toggle('dark', window.matchMedia("(prefers-color-scheme: dark)").matches);
  }

  function changeIconTheme(icon: string) {
    const iconElement = themeIconRef.current;

    iconElement?.classList.remove('ph-sun', 'ph-moon', 'ph-moon-stars');
    iconElement?.classList.add(icon);
  }

  return (
    <div className={className}>
      <button onClick={() => setThemeDropdown(!themeDropdown)} className="flex items-center justify-center cursor-pointer hover:bg-gray-200 dark:hover:bg-slate-800 rounded-full p-1">
        <i ref={themeIconRef} className="ph ph-sun text-2xl dark:text-gray-300"></i>
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