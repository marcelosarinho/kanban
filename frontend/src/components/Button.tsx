import type { ComponentProps } from "react";
import { BUTTON_VARIANTS } from "../libs/constants";

type ButtonProps = {
  variant?: keyof typeof BUTTON_VARIANTS;
} & ComponentProps<'button'>;

export default function Button(props: ButtonProps) {
  const { type, children, variant = 'primary', className, ...rest } = props;

  return (
    <button
      type={type}
      className={`${BUTTON_VARIANTS[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}