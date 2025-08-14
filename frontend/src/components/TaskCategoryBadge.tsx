import { CATEGORIES } from "../libs/constants";
import type { CategoryOption } from "../types/constants";

type TaskCategoryBadgeProps = {
  category: CategoryOption;
}

export default function TaskCategoryBadge(props: TaskCategoryBadgeProps) {
  const { category } = props;

  return (
    <div className={`task ${CATEGORIES[category || 'none'].color} h-fit flex items-center text-xs font-semibold border-[1.5px] rounded-full px-3 py-0.5`}>
      {CATEGORIES[category || 'none'].name}
    </div>
  )
}