import type { Icon as IconType } from "@phosphor-icons/react";

export type ButtonIconProps = {
  icon: IconType;
  iconClassName?: string;
}

export default function ButtonIcon(props: ButtonIconProps) {
  const { icon: Icon, iconClassName } = props;

  return (
    <Icon weight="bold" className={iconClassName} />
  )
}