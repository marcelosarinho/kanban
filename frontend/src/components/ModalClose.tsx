import type { ComponentProps } from "react";

export default function ModalClose(props: ComponentProps<'button'>) {
  const { ...rest } = props;

  return (
    <button {...rest}>
      <i className="ph ph-x"></i>
    </button>
  )
}