const categories = {
  frontend: { color: 'badge-blue', name: 'Front-end' },
  backend: { color: 'badge-green', name: 'Back-end' },
  mobile: { color: 'badge-red', name: 'Mobile' },
  ui_ux: { color: 'badge-purple', name: 'UI/UX' },
  devops: { color: 'badge-pink', name: 'DevOps' },
  database: { color: 'badge-orange', name: 'Banco de dados' },
}

type TaskCategoryBadgeProps = {
  category: keyof typeof categories;
}

export default function TaskCategoryBadge(props: TaskCategoryBadgeProps) {
  const { category } = props;

  return (
    <div className={`task ${categories[category].color} h-fit flex items-center text-xs font-semibold border-[1.5px] rounded-full px-3 py-0.5`}>
      {categories[category].name}
    </div>
  )
}