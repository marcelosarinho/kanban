import { EyeClosedIcon, EyeIcon } from "@phosphor-icons/react";
import { useState, type ComponentProps } from "react";

type InputProps = {
  label: string;
  error?: string;
  isPassword?: boolean
} & ComponentProps<'input'>;

export default function Input(props: InputProps) {
  const { label, className, isPassword = false, type = 'text', error, id, ...rest } = props;

  const [showPassword, setShowPassword] = useState(false);

  function renderInput() {
    if (isPassword) {
      return (
        <div className={`px-2 py-1.5 flex border ${error ? 'border-danger' : 'border-gray-300 dark:border-slate-950'} rounded w-full dark:bg-slate-800 has-[input:focus-visible]:ring-4 has-[input:focus-visible]:ring-primary/40 has-[input:focus-visible]:outline-none has-[input:focus-visible]:border has-[input:focus-visible]:border-primary dark:text-gray-300 gap-3 items-center`}>
          <input
            id={id}
            type={showPassword ? "text" : "password"}
            {...rest}
            className="flex-1 text-sm focus-visible:outline-none"
          />
          <div className="cursor-pointer">
            {showPassword ? <EyeIcon onClick={() => setShowPassword(false)} /> : <EyeClosedIcon onClick={() => setShowPassword(true)} />}
          </div>
        </div>
      )
    }

    return (
      <input
        id={id}
        type={type}
        {...rest}
        className={`text-sm px-2 py-1.5 border ${error ? 'border-danger' : 'border-gray-300 dark:border-slate-950'} rounded w-full dark:bg-slate-800 focus-visible:ring-4 focus-visible:ring-primary/40 focus-visible:outline-none focus-visible:border focus-visible:border-primary dark:text-gray-300`}
      />
    )
  }

  return (
    <div className={`relative flex flex-col ${className ?? ''}`}>
      <label htmlFor={id} className="w-fit block mb-1 dark:text-gray-300">{label}</label>
      {renderInput()}
      {error && <p className="text-danger text-sm mt-1">{error}</p>}
    </div>
  )
}