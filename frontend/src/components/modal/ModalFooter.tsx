import type { ComponentProps } from "react";

export default function ModalFooter(props: ComponentProps<'footer'>) {
  const { children, ...rest } = props;

  return (
    <footer className="flex flex-wrap justify-end gap-3" {...rest}>
      {children}
    </footer>
  )
}