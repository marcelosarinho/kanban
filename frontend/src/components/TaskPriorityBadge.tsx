const variants = {
  low: 'badge-success',
  medium: 'badge-warning',
  high: 'badge-danger',
}

type TaskPriorityBadgeProps = {
  priority: keyof typeof variants;
}

export default function TaskPriorityBadge(props: TaskPriorityBadgeProps) {
  const { priority } = props;

  return (
    <div className="flex flex-wrap gap-1">
      {priority === 'low' && (
        <div className={`${variants[priority]} inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border transition-colors w-fit`}>
          <span className="text-xs mr-2">●</span> Baixa prioridade
        </div>
      )}
      {priority === 'medium' && (
        <div className={`${variants[priority]} inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border transition-colors w-fit`}>
          <span className="text-xs mr-2">●●</span> Média prioridade
        </div>
      )}
      {priority === 'high' && (
        <div className={`${variants[priority]} inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border transition-colors w-fit`}>
          <span className="text-xs mr-2">●●●</span> Alta prioridade
        </div>
      )}
    </div>
  )
}