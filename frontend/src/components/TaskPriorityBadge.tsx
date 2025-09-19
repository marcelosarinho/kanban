import { TASK_PRIORITIES } from "../libs/constants";
import type { ComponentProps } from "react";

type TaskPriorityBadgeProps = {
  priority: keyof typeof TASK_PRIORITIES;
} & ComponentProps<'div'>

export default function TaskPriorityBadge(props: TaskPriorityBadgeProps) {
  const { priority, className } = props;

  return (
    <div className={`flex flex-wrap gap-1 ${className}`}>
      <div className={`${TASK_PRIORITIES[priority].color} inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border transition-colors w-fit`}>
        <span className="text-xs mr-2">{'●'.repeat(TASK_PRIORITIES[priority].dots)}</span> {TASK_PRIORITIES[priority].label} prioridade
      </div>
    </div>
  )
}