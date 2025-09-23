import type { ReactNode } from "react";

export default function Navbar({ children }: { children: ReactNode }) {
  return (
    <nav
      className="z-[1] fixed h-12 bg-white flex justify-end px-4 py-7 gap-3 items-center left-52 right-0 border-b border-gray-300 dark:bg-slate-900 dark:border-slate-700"
    >
      {children}
    </nav>
  );
}