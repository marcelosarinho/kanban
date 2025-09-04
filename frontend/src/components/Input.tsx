import type { ComponentProps } from "react";

type InputProps = {
  label: string;
  error?: string;
} & ComponentProps<'input'>;

export default function Input(props: InputProps) {
  const { label, className, type = 'text', error, id, ...rest } = props;

  return (
    <div className={`flex flex-col ${className ?? ''}`}>
      <label htmlFor={id} className="w-fit block mb-1 dark:text-gray-300">{label}</label>
      <input
        id={id}
        type={type}
        {...rest}
        className={`text-sm px-2 py-1.5 border ${error ? 'border-danger' : 'border-gray-300 dark:border-slate-950'} rounded w-full dark:bg-slate-800 focus-visible:ring-4 focus-visible:ring-primary/40 focus-visible:outline-none focus-visible:border focus-visible:border-primary dark:text-gray-300`}
      />
      {error && <p className="text-danger text-sm mt-1">{error}</p>}
    </div>
  )
}