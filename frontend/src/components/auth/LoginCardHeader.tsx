import type { ComponentProps } from "react";

export default function LoginCardHeader(props: ComponentProps<'header'>) {
  const { children, ...rest } = props;

  return (
    <header
      {...rest}
      className="border-b border-neutral-300 dark:border-slate-700 p-6"
    >
      {children}
    </header>
  )
}