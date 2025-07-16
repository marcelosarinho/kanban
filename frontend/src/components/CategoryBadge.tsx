import type { ComponentProps } from "react";

const categories = {
  frontend: { color: 'badge-blue', name: 'Front-end' },
  backend: { color: 'badge-green', name: 'Back-end' },
  mobile: { color: 'badge-red', name: 'Mobile' },
  ui_ux: { color: 'badge-purple', name: 'UI/UX' },
  devops: { color: 'badge-pink', name: 'DevOps' },
  database: { color: 'badge-orange', name: 'Banco de dados' },
}

type CategoryBadgeProps = {
  category: keyof typeof categories;
} & ComponentProps<'input'>

export default function CategoryBadge(props: CategoryBadgeProps) {
  const { category, disabled, ...rest } = props;

  return (
    <label className={`dark:bg-slate-800 dark:border-slate-950 dark:text-gray-300 has-[:disabled]:opacity-50 border-[1.5px] transition-colors border-gray-300 rounded-full py-1 px-2 cursor-pointer ${categories[category].color}`}>
      <input disabled={disabled} className="hidden" type="checkbox" {...rest} />
      {categories[category].name}
    </label>
  )
}