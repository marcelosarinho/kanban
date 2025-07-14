const colors = {
  purple: 'badge-purple',
  blue: 'badge-blue',
  green: 'badge-green',
  orange: 'badge-orange',
  pink: 'badge-pink',
  red: 'badge-red',
}

type CategoryBadgeProps = {
  color: keyof typeof colors;
  label: string;
}

export default function CategoryBadge(props: CategoryBadgeProps) {
  const { color, label } = props;

  return (
    <label className={`dark:bg-slate-800 dark:border-slate-950 dark:text-gray-300 has-[:disabled]:opacity-50 border-[1.5px] transition-colors border-gray-300 rounded-full py-1 px-2 cursor-pointer ${colors[color]}`}>
      <input className="hidden" type="checkbox" />
      {label}
    </label>
  )
}