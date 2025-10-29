import type { ComponentProps, ReactNode } from "react";
import { BUTTON_VARIANTS } from "@libs/constants";
import Loading from "@components/Loading";
import type { ButtonOption } from "@custom-types/constants";

type ButtonProps = {
  variant?: ButtonOption;
  loading?: boolean;
  disabledOnError?: boolean;
  icon?: ReactNode;
} & ComponentProps<'button'>;

export default function Button(props: ButtonProps) {
  const { type, children, variant = 'primary', loading, disabledOnError, icon, className, ...rest } = props;

  return (
    <button
      disabled={loading || disabledOnError}
      type={type}
      className={`${BUTTON_VARIANTS[variant]} ${className ?? ''} disabled:opacity-50 disabled:cursor-not-allowed`}
      {...rest}
    >
      {loading ? <Loading className="text-lg" loading={loading}/> : icon}
      {children}
    </button>
  )
}