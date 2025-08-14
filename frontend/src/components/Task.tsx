import TaskCategoryBadge from "./TaskCategoryBadge"
import TaskPriorityBadge from "./TaskPriorityBadge"
import ProgressBar from "./ProgressBar"
import { useState } from "react"
import { ChatIcon, CheckCircleIcon, CheckFatIcon, CheckIcon, SquaresFourIcon, TrashIcon } from "@phosphor-icons/react";
import Button from "./Button";
import Textarea from "./Textarea";
import { TASK_COLORS, TASK_PRIORITIES } from "../libs/constants";
import CustomTooltip from "./CustomTooltip";
import Subtasks from "./Subtasks";
import type { Task } from "../types/task";
import type { CategoryOption } from "../types/constants";

type TaskProps = {
  onClick: () => void;
  task: Task;
}

export default function Task(props: TaskProps) {
  const { onClick, task } = props;

  const [toggleElement, setToggleElement] = useState({
    color: false,
    comment: false,
    subtasks: false,
  });

  const taskCategories = task.category?.split(',') as CategoryOption[] || ["none"];

  return (
    <div className={`relative p-4 border border-l-4 ${task.done ? 'opacity-50' : ''} ${TASK_COLORS[task.color || 'none'].border} rounded-md bg-white dark:bg-slate-800 dark:text-gray-300`}>
      {task.done && (
        <CheckCircleIcon size={24} weight="fill" className="absolute right-0 top-0 z-[1] text-success" />
      )}

      <header className="flex justify-between items-center">
          <div className="flex flex-wrap gap-1">
            {taskCategories.map((category) => (
              <TaskCategoryBadge key={category} category={category} />
            ))}
          </div>
          <div className="relative">
            <div
              className="border rounded py-1.5 px-2 border-dashed border-gray-300 dark:border-slate-600 hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-900 transition-colors z-50"
              onClick={() => setToggleElement({...toggleElement, color: !toggleElement.color})}
            >
              <div className={`size-3 rounded-full ${TASK_COLORS[task.color || 'none'].bg}`}></div>
            </div>
            {toggleElement.color && (
              <div className="absolute right-0 bg-white border border-gray-300 dark:bg-slate-800 dark:border-slate-600 text-sm p-1 rounded-md flex flex-col select-none">
                {Object.entries(TASK_COLORS).map(([key, value]) => (
                  <div key={key} className="hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center gap-2 p-1 rounded-xs cursor-pointer">
                    <span className={`rounded-full size-3 ${value.bg}`}></span>
                    <span>{value.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
      </header>

      <div className="my-2">
          <h1 className={`font-medium text-lg ${task.done ? 'line-through' : ''}`}>{task.name}</h1>
          <p className={`text-sm leading-tight ${task.done ? 'line-through' : ''}`}>{task.description}</p>
      </div>

      <div className="flex justify-between items-center my-3">
          <div className="relative flex items-center gap-1.5 font-medium">
              <input
                checked={task.done}
                className="peer appearance-none size-4 border border-gray-300 rounded-xs dark:border-slate-600 checked:bg-success transition-colors"
                type="checkbox"
                name={`done_${task.id}`}
                id={`done_${task.id}`}
              />
              <CheckIcon weight="bold" className="pointer-events-none hidden peer-checked:block absolute text-black" />
              <label className="select-none text-sm peer-checked:line-through transition-normal" htmlFor={`done_${task.id}`}>
                Concluída
              </label>
          </div>
          <select value={task.priority} className="text-sm border rounded p-1 border-gray-300 dark:border-slate-600" name={`priority_${task.id}`} id={`priority_${task.id}`}>
              {Object.entries(TASK_PRIORITIES).map(([key, value]) => (
                <option key={key} value={key}>{value.label}</option>
              ))}
          </select>
      </div>

      <div className="my-3">
        <ProgressBar progress={task.progress} />
      </div>

      <Subtasks onClick={() => setToggleElement({...toggleElement, subtasks: !toggleElement.subtasks})} title="teste" open={toggleElement.subtasks} />

      <div className="my-5 flex justify-between">
        <TaskPriorityBadge priority={task.priority}/>
        <Button
          id={`comments_${task.id}`}
          variant="transparent"
          onClick={() => setToggleElement({...toggleElement, comment: !toggleElement.comment})}
        >
          <ChatIcon weight="bold" />
          <CustomTooltip anchorSelect={`#comments_${task.id}`} content="Comentários" />
        </Button>
      </div>

      {toggleElement.comment && (
        <div className="mb-2">
          <Textarea name={`commentary_${task.id}`} value={task.commentary} className="dark:border-slate-600!" />
        </div>
      )}

      <footer className="flex justify-between items-center">
        <Button onClick={onClick} className="text-xs!" variant="info">
          <SquaresFourIcon weight="bold" />
          Categorias
        </Button>

        <Button id={`delete_${task.id}`} variant="transparent">
          <TrashIcon className="text-danger" weight="bold" />
          <CustomTooltip anchorSelect={`#delete_${task.id}`} content="Deletar" />
        </Button>
      </footer>
    </div>
  )
}