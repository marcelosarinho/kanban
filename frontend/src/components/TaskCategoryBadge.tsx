const categories = {
  frontend: 'badge-blue',
  backend: 'badge-green',
  mobile: 'badge-red',
  ui_ux: 'badge-purple',
  devops: 'badge-pink',
  database: 'badge-orange',
}

type TaskCategoryBadgeProps = {
  category: keyof typeof categories;
}

export default function TaskCategoryBadge(props: TaskCategoryBadgeProps) {
  const { category } = props;

  return (
    <div className={`task ${categories[category]} h-fit flex items-center text-xs font-semibold border-[1.5px] rounded-full px-3 py-0.5`}>
      {category}
    </div>
  )
}