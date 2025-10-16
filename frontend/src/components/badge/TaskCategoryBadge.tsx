import { CATEGORIES } from "@libs/constants";
import type { CategoryOption } from "@custom-types/constants";
import type { ComponentProps } from "react";

type TaskCategoryBadgeProps = {
  category: CategoryOption;
} & ComponentProps<'div'>

export default function TaskCategoryBadge(props: TaskCategoryBadgeProps) {
  const { category, className } = props;

  return (
    <div className={`task ${CATEGORIES[category || 'none'].color} h-fit flex items-center text-xs font-semibold border-[1.5px] rounded-full px-3 py-0.5 ${className ?? ''}`}>
      {CATEGORIES[category || 'none'].name}
    </div>
  )
}