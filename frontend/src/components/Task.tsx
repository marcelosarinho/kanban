import TaskCategoryBadge from "./TaskCategoryBadge"
import TaskPriorityBadge from "./TaskPriorityBadge"
import ProgressBar from "./ProgressBar"
import { useState } from "react"
import { ChatIcon, CheckIcon, PencilSimpleIcon, TrashIcon } from "@phosphor-icons/react";
import Button from "./Button";
import Textarea from "./Textarea";
import { TASK_COLORS, TASK_PRIORITIES } from "../libs/constants";

type TaskProps = {
  color: keyof typeof TASK_COLORS;
}

export default function Task(props: TaskProps) {
  const { color } = props;

  const [toggleElement, setToggleElement] = useState({
    color: false,
    comment: false,
  });

  return (
    <div className={`p-4 border border-l-4 ${TASK_COLORS[color].border} rounded-md bg-white dark:bg-slate-800 dark:text-gray-300`}>
    <header className="flex justify-between items-center">
        <div className="flex flex-wrap gap-1">
          <TaskCategoryBadge category="frontend" />
          <TaskCategoryBadge category="backend" />
        </div>
        <div className="relative">
          <div
            title="Selecionar cor"
            className="border rounded py-1.5 px-2 border-dashed border-gray-300 dark:border-slate-600 hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors z-50"
            onClick={() => setToggleElement({...toggleElement, color: !toggleElement.color})}
          >
            <div className={`size-3 rounded-full ${TASK_COLORS[color].bg}`}></div>
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
        <h1 className="font-medium text-lg">Nome</h1>
        <p className="text-sm leading-tight">Descrição</p>
    </div>

    <div className="flex justify-between items-end my-3">
        <div className="flex items-center gap-1.5 font-medium">
            <input
              className="peer appearance-none size-4 border border-gray-300 rounded-xs dark:border-slate-600 checked:bg-success transition-colors"
              type="checkbox"
              name="done"
              id="done"
            />
            <CheckIcon weight="bold" className="pointer-events-none hidden peer-checked:block absolute text-black" />
            <label className="select-none text-sm peer-checked:line-through transition-normal" htmlFor="done">Concluída</label>
        </div>
        <select className="text-sm border rounded p-1 border-gray-300 dark:border-slate-600" name="priority" id="priority">
            {Object.entries(TASK_PRIORITIES).map(([key, value]) => (
              <option key={key} value={key}>{value.label}</option>
            ))}
        </select>
    </div>

    <div className="my-3">
        <ProgressBar />
    </div>

    <div className="my-5 flex justify-between">
      <TaskPriorityBadge priority="low"/>
      <button
        title="Comentários"
        className="flex items-center cursor-pointer p-1 rounded-full hover:bg-gray-200 dark:hover:bg-slate-900 transition-colors"
        onClick={() => setToggleElement({...toggleElement, comment: !toggleElement.comment})}
      >
        <ChatIcon weight="bold" />
      </button>
    </div>

    {toggleElement.comment && (
      <div className="mb-2">
        <Textarea className="dark:border-slate-600!" />
      </div>
    )}

    <footer className="flex gap-1 justify-end">
      <Button variant="transparent" title="Editar">
        <PencilSimpleIcon weight="bold" />
      </Button>
      <Button variant="transparent" title="Deletar">
        <TrashIcon className="text-danger" weight="bold" />
      </Button>
    </footer>
</div>
  )
}