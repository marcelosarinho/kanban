import type { ReactNode } from "react";

type NavbarProps = {
  children?: ReactNode;
  actions?: ReactNode[];
}

export default function Navbar(props: NavbarProps) {
  const { children, actions } = props;

  return (
    <nav
      className="z-[1] fixed h-12 bg-white flex justify-end px-4 py-7 gap-3 items-center left-52 right-0 border-b border-gray-300 dark:bg-slate-900 dark:border-slate-700"
    >
      {actions && actions.length > 0 && <>{actions}</>}
      {children}
    </nav>
  );
}