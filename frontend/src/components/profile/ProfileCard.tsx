import type { ComponentProps } from "react";

export default function ProfileCard(props: ComponentProps<'div'>) {
  const { children, className, ...rest } = props;

  return (
    <div
      {...rest}
      className={`p-4 animate-in w-full border rounded-lg bg-white border-neutral-300 dark:bg-slate-900 dark:border-slate-700 shadow-lg ${className ?? ''}`}
    >
      {children}
    </div>
  )
}