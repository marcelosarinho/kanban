import type { ComponentProps } from "react";
import { BUTTON_VARIANTS } from "@libs/constants";
import Loading from "@components/Loading";
import type { ButtonOption } from "@custom-types/constants";
import ButtonIcon from "./ButtonIcon";
import type { Icon } from "@phosphor-icons/react";

type ButtonProps = {
  variant?: ButtonOption;
  loading?: boolean;
  disabledOnError?: boolean;
  icon?: Icon;
  iconClassName?: string;
} & ComponentProps<'button'>;

export default function Button(props: ButtonProps) {
  const { type, children, variant = 'primary', loading, disabledOnError, icon, iconClassName, className, ...rest } = props;

  return (
    <button
      disabled={loading || disabledOnError}
      type={type}
      className={`${BUTTON_VARIANTS[variant]} ${className ?? ''} disabled:opacity-50 disabled:cursor-not-allowed`}
      {...rest}
    >
      {loading && <Loading className="text-lg" loading={loading}/>}
      {!loading && icon && <ButtonIcon icon={icon} iconClassName={iconClassName} />}
      {children}
    </button>
  )
}