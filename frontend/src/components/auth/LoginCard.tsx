import type { ComponentProps } from "react";

export default function LoginCard(props: ComponentProps<'div'>) {
  const { children, className, ...rest } = props;

  return (
    <div
      {...rest}
      className={`animate-in min-w-1/2 max-w-sm lg:min-w-1/3 lg:max-w-lg xl:min-w-1/4 xl:max-w-xl border rounded-lg bg-white border-neutral-300 dark:bg-slate-900 dark:border-slate-700 shadow-lg ${className ?? ''}`}
    >
      {children}
    </div>
  )
}