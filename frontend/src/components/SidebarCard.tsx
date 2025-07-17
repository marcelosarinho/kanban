import { PencilSimpleIcon, TrashIcon } from "@phosphor-icons/react";
import Button from "./Button";
import { Tooltip } from "react-tooltip";

type SidebarCardProps = {
  name: string;
  description: string;
}

export default function SidebarCard(props: SidebarCardProps) {
  const { name, description } = props;

  return (
    <div className="bg-gray-100 py-2 px-3 rounded border border-gray-300 dark:bg-slate-800 dark:border-slate-700 dark:text-gray-300 hover:border-primary transition-colors">
      <h2 id="teste" title={name} className="w-fit font-semibold truncate">{name}</h2>
      <Tooltip anchorSelect="#teste" content="Projeto" disableStyleInjection className="rounded border border-gray-300 bg-white dark:bg-slate-900 dark:border-slate-700 px-2 py-1 text-sm" />

      <h6 id="teste2" title={description} className="w-fit text-sm truncate leading-tight">{description}</h6>
      <Tooltip anchorSelect="#teste2" content="Descrição" disableStyleInjection className="rounded border border-gray-300 bg-white dark:bg-slate-900 dark:border-slate-700 px-2 py-1 text-sm" />

      <div className="flex items-center justify-end">
        <Button id="teste3" variant="transparent" title="Editar">
          <PencilSimpleIcon weight="bold" className="text-lg text-info transition-colors" />
          <Tooltip anchorSelect="#teste3" content="Editar" disableStyleInjection className="rounded border border-gray-300 bg-white dark:bg-slate-900 dark:border-slate-700 px-2 py-1 text-sm" />
        </Button>
        <Button id="teste4" variant="transparent" title="Deletar">
          <TrashIcon weight="bold" className="text-lg text-danger transition-colors" />
          <Tooltip anchorSelect="#teste4" content="Deletar" disableStyleInjection className="rounded border border-gray-300 bg-white dark:bg-slate-900 dark:border-slate-700 px-2 py-1 text-sm" />
        </Button>
      </div>
    </div>
  )
}