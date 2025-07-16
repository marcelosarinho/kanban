const variants = {
  low: { color: 'badge-success', label: 'Baixa prioridade', dots: 1 },
  medium: { color: 'badge-warning', label: 'Média prioridade', dots: 2 },
  high: { color: 'badge-danger', label: 'Alta prioridade', dots: 3 },
}

type TaskPriorityBadgeProps = {
  priority: keyof typeof variants;
}

export default function TaskPriorityBadge(props: TaskPriorityBadgeProps) {
  const { priority } = props;

  return (
    <div className="flex flex-wrap gap-1">
      <div className={`${variants[priority].color} inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border transition-colors w-fit`}>
        <span className="text-xs mr-2">{'●'.repeat(variants[priority].dots)}</span> {variants[priority].label}
      </div>
    </div>
  )
}