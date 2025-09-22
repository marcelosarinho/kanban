import { Outlet } from "react-router";
import ThemeButton from "./ThemeButton";
import ThemeProvider from "@providers/ThemeProvider";

export default function AuthLayout() {
  return (
    <ThemeProvider>
      <main className="flex justify-center items-center h-screen">
        <ThemeButton className="fixed top-4 right-4" />

        <Outlet />
      </main>
    </ThemeProvider>
  )
}