import type { ComponentProps } from "react";

export default function Modal(props: ComponentProps<'dialog'>) {
  const { children, id, ...rest } = props;

  return (
      <dialog className="fixed bg-black/35 z-50 size-full" id={id} {...rest}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white">
          {children}
        </div>
      </dialog>
  )
}