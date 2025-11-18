import type { ComponentProps } from "react";

export default function Modal(props: ComponentProps<'dialog'>) {
  const { children, ...rest } = props;

  return (
    <dialog className="fixed bg-black/35 z-50 size-full" {...rest}>
      <div className="absolute w-10/12 lg:w-1/2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-300 p-5 rounded dark:bg-slate-900 dark:border-slate-700">
        {children}
      </div>
    </dialog>
  )
}