import type { ComponentProps } from "react";

type InputProps = {
  label: string;
} & ComponentProps<'input'>;

export default function Input(props: InputProps) {
  const { label, type = 'text', id, ...rest } = props;

  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="w-fit block mb-1 dark:text-gray-300">{label}</label>
      <input
        id={id}
        type={type}
        {...rest}
        className="text-sm px-2 py-1.5 border border-gray-300 rounded w-full dark:bg-slate-800 dark:border-slate-950 focus-visible:ring-4 focus-visible:ring-primary/40 focus-visible:outline-none focus-visible:border focus-visible:border-primary dark:text-gray-300"
      />
    </div>
  )
}