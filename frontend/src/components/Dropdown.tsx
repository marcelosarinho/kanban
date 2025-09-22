import type { ComponentProps, ReactNode } from "react"

type DropdownProps = {
  children: ReactNode;
} & ComponentProps<'div'>

export default function Dropdown(props: DropdownProps) {
  const { children, ...rest } = props;

  return (
    <div className="absolute right-12 top-10 bg-white rounded-md mt-2 p-2 w-28 text-sm border border-gray-300 dark:bg-slate-900 dark:border-slate-700 dark:text-gray-300 select-none" {...rest}>
      {children}
    </div>
  )
}