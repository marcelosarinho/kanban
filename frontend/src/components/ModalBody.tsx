import type { ComponentProps } from "react";

export default function ModalBody(props: ComponentProps<'div'>) {
  const { children, ...rest } = props;

  return (
    <div {...rest}>
      {children}
    </div>
  )
}