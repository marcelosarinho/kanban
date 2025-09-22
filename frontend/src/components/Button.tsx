import type { ComponentProps } from "react";
import { BUTTON_VARIANTS } from "@libs/constants";
import Loading from "@components/Loading";

type ButtonProps = {
  variant?: keyof typeof BUTTON_VARIANTS;
  loading?: boolean;
} & ComponentProps<'button'>;

export default function Button(props: ButtonProps) {
  const { type, children, variant = 'primary', loading, className, ...rest } = props;

  return (
    <button
      disabled={loading}
      type={type}
      className={`${BUTTON_VARIANTS[variant]} ${className ?? ''} disabled:opacity-50 disabled:cursor-not-allowed`}
      {...rest}
    >
      {loading && <Loading className="text-lg" loading={loading}/>}
      {children}
    </button>
  )
}