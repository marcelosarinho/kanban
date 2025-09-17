import type { ComponentProps } from "react";

export default function LoginCardFooter(props: ComponentProps<'footer'>) {
  const { children, ...rest } = props;

  return (
    <footer
      {...rest}
      className="p-6 border-t border-neutral-300 dark:border-slate-700"
    >
      {children}
    </footer>
  )
}