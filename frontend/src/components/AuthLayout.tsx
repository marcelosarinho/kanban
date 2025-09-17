import { Outlet } from "react-router";
import ThemeButton from "./ThemeButton";

export default function AuthLayout() {
  return (
    <main className="flex justify-center items-center h-screen">
      <ThemeButton className="fixed top-4 right-4" />

      <Outlet />
    </main>
  )
}