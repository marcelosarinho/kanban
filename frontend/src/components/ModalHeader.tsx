import type { ComponentProps } from "react";

export default function ModalHeader(props: ComponentProps<'header'>) {
  const { children, ...rest } = props;

  return (
    <header className="mb-3 flex justify-between items-center" {...rest}>
      {children}
    </header>
  )
}