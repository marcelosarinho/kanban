import type { ComponentProps } from "react";

export default function NavbarButton(props: ComponentProps<'button'>) {
  return (
    <button
      className="flex items-center justify-center cursor-pointer hover:bg-gray-200 dark:hover:bg-slate-800 rounded-full p-1"
      {...props}
    />
  )
}