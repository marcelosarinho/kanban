import { PencilSimpleIcon, TrashIcon } from "@phosphor-icons/react";
import Button from "./Button";
import CustomTooltip from "./CustomTooltip";
import type { Project } from "../types/project";
import { addUnderscoresToText } from "../utils/functions";

type SidebarCardProps = {
  project: Project;
  openModal: (modalId: string, project?: Project, edit?: boolean) => void;
}

export default function SidebarCard(props: SidebarCardProps) {
  const { project, openModal } = props;

  const underscoredProjectName = addUnderscoresToText(project.name);
  const underscoredProjectDescription = addUnderscoresToText(project.description);

  return (
    <div className="bg-gray-100 py-2 px-3 rounded border border-gray-300 dark:bg-slate-800 dark:border-slate-700 dark:text-gray-300 hover:border-primary transition-colors">
      <h2 id={underscoredProjectName} className="w-fit font-semibold truncate">{project.name}</h2>
      <CustomTooltip anchorSelect={`#${underscoredProjectName}`} content={project.name} />

      <h6 id={underscoredProjectDescription} className="w-fit text-sm truncate leading-tight">{project.description}</h6>
      <CustomTooltip anchorSelect={`#${underscoredProjectDescription}`} content={project.description} />

      <div className="flex items-center justify-end">
        <Button id={`edit_${underscoredProjectName}`} variant="transparent" onClick={() => openModal('create-project-modal', project, true)}>
          <PencilSimpleIcon weight="bold" className="text-lg text-info transition-colors" />
          <CustomTooltip anchorSelect={`#edit_${underscoredProjectName}`} content="Editar" />
        </Button>
        <Button id={`delete_${underscoredProjectName}`} variant="transparent" onClick={() => openModal('delete-project-modal', project)}>
          <TrashIcon weight="bold" className="text-lg text-danger transition-colors" />
          <CustomTooltip anchorSelect={`#delete_${underscoredProjectName}`} content="Deletar" />
        </Button>
      </div>
    </div>
  )
}