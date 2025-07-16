import type { ComponentProps } from "react";
import { CATEGORIES } from "../libs/constants";

type CategoryBadgeProps = {
  category: keyof typeof CATEGORIES;
} & ComponentProps<'input'>

export default function CategoryBadge(props: CategoryBadgeProps) {
  const { category, disabled, ...rest } = props;

  return (
    <label className={`dark:bg-slate-800 dark:border-slate-950 dark:text-gray-300 has-[:disabled]:opacity-50 border-[1.5px] transition-colors border-gray-300 rounded-full py-1 px-2 cursor-pointer ${CATEGORIES[category].color}`}>
      <input disabled={disabled} className="hidden" type="checkbox" {...rest} />
      {CATEGORIES[category].name}
    </label>
  )
}