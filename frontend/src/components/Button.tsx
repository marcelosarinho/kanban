import type { ComponentProps } from "react";

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info' | 'light' | 'dark' | 'link' | 'outline-primary';
} & ComponentProps<'button'>;

const variants: { [key: string]: string } = {
  'primary': 'btn btn-primary',
  'danger': 'btn btn-danger',
  'success': 'btn btn-success',
  'info': 'btn btn-info',
  'outline-primary': 'btn btn-outline btn-outline-primary',
}

export default function Button(props: ButtonProps) {
  const { type, children, variant = 'primary', ...rest } = props;

  return (
    <button
      type={type}
      className={variants[variant]}
      {...rest}
    >
      {children}
    </button>
  )
}