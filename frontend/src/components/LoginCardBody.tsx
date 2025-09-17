import type { ComponentProps } from "react";

export default function LoginCardBody(props: ComponentProps<'div'>) {
  const { children, ...rest } = props;

  return (
    <div
      {...rest}
      className="p-6"
    >
      {children}
    </div>
  )
}