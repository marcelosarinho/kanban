import { PencilSimpleIcon, TrashIcon } from "@phosphor-icons/react";
import Button from "@components/Button";
import CustomTooltip from "@components/CustomTooltip";
import type { Project } from "@custom-types/project";
import { addUnderscoresToText } from "@utils/functions";

type ProjectProps = {
  project: Project;
  openModal: (modalId: string, project?: Project, edit?: boolean) => void;
  selected: boolean;
  onClick: () => void;
}

export default function Project(props: ProjectProps) {
  const { project, openModal, selected, onClick } = props;

  const underscoredProjectName = addUnderscoresToText(project.name);
  const underscoredProjectDescription = addUnderscoresToText(project.description);

  return (
    <div
      className={`bg-gray-100 py-2 px-3 rounded dark:bg-slate-800 dark:text-gray-300 cursor-pointer hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors ${selected ? 'border border-primary' : 'border border-gray-300 dark:border-slate-700'}`}
      onClick={onClick}
    >
      <h2 id={underscoredProjectName} className="max-w-full w-fit font-semibold truncate">{project.name}</h2>
      <CustomTooltip anchorSelect={`#${underscoredProjectName}`} content={project.name} />

      <h6 id={underscoredProjectDescription} className="max-w-full w-fit text-sm truncate leading-tight">{project.description}</h6>
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