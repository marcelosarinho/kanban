import type { ComponentProps } from "react";

export default function ModalBody(props: ComponentProps<'div'>) {
  const { children, ...rest } = props;

  return (
    <div className="mb-4 dark:text-gray-300 text-base/snug" {...rest}>
      {children}
    </div>
  )
}