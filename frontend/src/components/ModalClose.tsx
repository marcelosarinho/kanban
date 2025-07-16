import type { ComponentProps } from "react";
import { XIcon } from "@phosphor-icons/react";

export default function ModalClose(props: ComponentProps<'button'>) {
  const { ...rest } = props;

  return (
    <button
      type="button"
      className="flex items-center justify-center rounded-full cursor-pointer p-1 transition-colors hover:bg-gray-200 dark:hover:bg-slate-800 dark:text-gray-300"
      {...rest}
    >
      <XIcon className="ph ph-x" />
    </button>
  )
}