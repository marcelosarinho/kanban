import type { ComponentProps } from "react";

export default function LoginCardBody(props: ComponentProps<'div'>) {
  const { children, className, ...rest } = props;

  return (
    <div
      {...rest}
      className={`p-6 ${className}`}
    >
      {children}
    </div>
  )
}