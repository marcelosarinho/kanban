import type { ComponentProps } from "react";

export default function ModalFooter(props: ComponentProps<'footer'>) {
  const { children, ...rest } = props;

  return (
    <footer {...rest}>
      {children}
    </footer>
  )
}