import type { ComponentProps } from "react";

export default function ModalTitle(props: ComponentProps<'h1'>) {
  const { children, ...rest } = props;

  return (
    <h1 {...rest}>{children}</h1>
  )
}