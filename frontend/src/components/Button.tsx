import type { ComponentProps } from "react";

const variants = {
  'primary': 'btn btn-primary',
  'danger': 'btn btn-danger',
  'success': 'btn btn-success',
  'info': 'btn btn-info',
  'outline-primary': 'btn btn-outline btn-outline-primary',
  'transparent': 'btn-transparent',
}

type ButtonProps = {
  variant?: keyof typeof variants;
} & ComponentProps<'button'>;

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