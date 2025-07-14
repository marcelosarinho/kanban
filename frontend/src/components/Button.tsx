import type { ComponentProps } from "react";

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info' | 'light' | 'dark' | 'link' | 'outline-primary';
} & ComponentProps<'button'>;

const variants: { [key: string]: string } = {
  'primary': 'btn-primary',
  'danger': 'btn-danger',
  'success': 'btn-success',
  'info': 'btn-info',
  'outline-primary': 'btn-outline btn-outline-primary',
}

export default function Button(props: ButtonProps) {
  const { type, children, variant = 'primary', ...rest } = props;

  return (
    <button
      type={type}
      className={`flex items-center rounded-md gap-1 px-3 py-2 hover:-translate-y-1 cursor-pointer transition text-sm font-medium ${variants[variant]}`}
      {...rest}
    >
      {children}
    </button>
  )
}