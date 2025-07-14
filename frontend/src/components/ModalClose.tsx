import type { ComponentProps } from "react";

export default function ModalClose(props: ComponentProps<'button'>) {
  const { ...rest } = props;

  return (
    <button
      type="button"
      className="flex items-center justify-center rounded-full cursor-pointer p-1 transition-colors hover:bg-gray-200 dark:hover:bg-slate-800 dark:text-gray-300"
      {...rest}
    >
      <i className="ph ph-x"></i>
    </button>
  )
}