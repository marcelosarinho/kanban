import { Link, Outlet } from "react-router";
import ThemeButton from "@components/theme/ThemeButton";
import { KanbanIcon } from "@phosphor-icons/react";

export default function AuthLayout() {
  return (
    <main className="flex justify-center items-center h-screen">
      <div className="fixed top-4 left-4">
        <Link to="/auth/login" className="cursor-pointer flex items-center justify-center hover:bg-gray-200 dark:hover:bg-slate-800 rounded-full p-1">
          <KanbanIcon className="text-2xl dark:text-gray-300" />
        </Link>
      </div>

      <ThemeButton
        className="fixed top-4 right-4"
        dropdownClassName="right-0"
      />

      <Outlet />
    </main>
  )
}