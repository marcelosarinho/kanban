import type { ComponentProps } from "react";

export default function ProfileCardHeader(props: ComponentProps<'header'>) {
  const { children, ...rest } = props;

  return (
    <header className="mb-3" {...rest}>
      {children}
    </header>
  )
}