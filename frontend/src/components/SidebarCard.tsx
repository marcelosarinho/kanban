import { PencilSimpleIcon, TrashIcon } from "@phosphor-icons/react";
import Button from "./Button";

type SidebarCardProps = {
  name: string;
  description: string;
}

export default function SidebarCard(props: SidebarCardProps) {
  const { name, description } = props;

  return (
    <div className="bg-gray-100 py-2 px-3 rounded border border-gray-300 dark:bg-slate-800 dark:border-slate-700 dark:text-gray-300 hover:border-primary transition-colors">
      <h2 title={name} className="font-semibold truncate">{name}</h2>
      <h6 title={description} className="text-sm truncate leading-tight">{description}</h6>

      <div className="flex items-center justify-end">
        <Button variant="transparent">
          <PencilSimpleIcon weight="bold" className="text-lg text-info group-hover:text-info/60 transition-colors" />
        </Button>
        <Button variant="transparent">
          <TrashIcon weight="bold" className="text-lg text-danger group-hover:text-red-600 transition-colors" />
        </Button>
      </div>
    </div>
  )
}