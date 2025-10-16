import type { ComponentProps } from "react"

export default function DropdownOption(props: ComponentProps<'div'>) {
  const { children, className, ...rest } = props;

  return (
    <div className={`rounded px-2 py-1 flex items-center hover:bg-gray-100 cursor-pointer dark:hover:bg-slate-800 ${className ?? ''} gap-2`} {...rest}>
      {children}
    </div>
  )
}