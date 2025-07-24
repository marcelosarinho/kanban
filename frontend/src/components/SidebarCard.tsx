import { PencilSimpleIcon, TrashIcon } from "@phosphor-icons/react";
import Button from "./Button";
import CustomTooltip from "./CustomTooltip";
import toast from "react-hot-toast";

type SidebarCardProps = {
  id: string;
  name: string;
  description: string;
}

export default function SidebarCard(props: SidebarCardProps) {
  const { id, name, description } = props;

  async function deleteProject() {
    try {
      await fetch(`http://localhost:8080/projects/${id}`, {
        method: 'DELETE',
      })

      toast.success('Projeto deletado com sucesso!');
    } catch (error) {
      console.log(error);
      toast.error('Erro ao deletar projeto!');
    }
  }

  function updateProject() {
    console.log(id);
  }

  return (
    <div className="bg-gray-100 py-2 px-3 rounded border border-gray-300 dark:bg-slate-800 dark:border-slate-700 dark:text-gray-300 hover:border-primary transition-colors">
      <h2 id={name} className="w-fit font-semibold truncate">{name}</h2>
      <CustomTooltip anchorSelect={`#${name}`} content={name} />

      <h6 id={description} className="w-fit text-sm truncate leading-tight">{description}</h6>
      <CustomTooltip anchorSelect={`#${description}`} content={description} />

      <div className="flex items-center justify-end">
        <Button id={`edit_${name}`} variant="transparent" onClick={updateProject}>
          <PencilSimpleIcon weight="bold" className="text-lg text-info transition-colors" />
          <CustomTooltip anchorSelect={`#edit_${name}`} content="Editar" />
        </Button>
        <Button id={`delete_${name}`} variant="transparent" onClick={deleteProject}>
          <TrashIcon weight="bold" className="text-lg text-danger transition-colors" />
          <CustomTooltip anchorSelect={`#delete_${name}`} content="Deletar" />
        </Button>
      </div>
    </div>
  )
}