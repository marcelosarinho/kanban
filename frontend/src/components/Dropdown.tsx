import type { ComponentProps, ReactNode } from "react"

type DropdownProps = {
  children: ReactNode;
} & ComponentProps<'div'>

export default function Dropdown(props: DropdownProps) {
  const { children, className, ...rest } = props;

  return (
    <div className={`animate-dropdown absolute bg-white rounded-md mt-2 p-2 w-28 text-sm border border-gray-300 dark:bg-slate-900 dark:border-slate-700 dark:text-gray-300 select-none ${className}`} {...rest}>
      {children}
    </div>
  )
}