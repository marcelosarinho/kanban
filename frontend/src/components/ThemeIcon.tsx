import { THEME_ICONS, THEME_ICONS_SIZE } from "@libs/constants";
import type { ThemeOption } from "types/constants"

type ThemeIconProps = {
  theme: ThemeOption;
  size: 'sm' | 'lg';
}

export default function ThemeIcon(props: ThemeIconProps) {
  const { theme, size = 'lg' } = props;

  function renderIcon() {
    const Icon = THEME_ICONS[theme];
    const iconSize = THEME_ICONS_SIZE[size];

    return <Icon className={iconSize} />
  }

  return (
    renderIcon()
  )
}