import type { ComponentProps } from "react";

export default function Modal(props: ComponentProps<'dialog'>) {
  const { children, id, ...rest } = props;

  return (
    <dialog id={id} {...rest}>
      {children}
    </dialog>
  )
}