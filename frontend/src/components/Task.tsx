import TaskCategoryBadge from "./TaskCategoryBadge"
import TaskPriorityBadge from "./TaskPriorityBadge"
import ProgressBar from "./ProgressBar"
import { useState } from "react"
import { ChatIcon, CheckIcon, PencilSimpleIcon, TrashIcon } from "@phosphor-icons/react";
import Button from "./Button";
import Textarea from "./Textarea";

const taskColors = {
  blue: { bg: 'bg-blue-500 dark:bg-blue-700', border: 'border-blue-500 dark:border-blue-700' },
  red: { bg: 'bg-red-500 dark:bg-red-700', border: 'border-red-500 dark:border-red-700' },
  green: { bg: 'bg-green-500 dark:bg-green-700', border: 'border-green-500 dark:border-green-700' },
  yellow: { bg: 'bg-yellow-500 dark:bg-yellow-700', border: 'border-yellow-500 dark:border-yellow-700' },
  purple: { bg: 'bg-purple-500 dark:bg-purple-700', border: 'border-purple-500 dark:border-purple-700' },
  pink: { bg: 'bg-pink-500 dark:bg-pink-700', border: 'border-pink-500 dark:border-pink-700' },
  orange: { bg: 'bg-orange-500 dark:bg-orange-700', border: 'border-orange-500 dark:border-orange-700' },
}

type TaskProps = {
  color: keyof typeof taskColors;
}

export default function Task(props: TaskProps) {
  const { color } = props;

  const [toggleElement, setToggleElement] = useState({
    color: false,
    comment: false,
  });

  return (
    <div className={`p-4 border border-l-4 ${taskColors[color].border} rounded-md bg-white dark:bg-slate-800 dark:text-gray-300`}>
    <header className="flex justify-between items-center">
        <div className="flex flex-wrap gap-1">
          <TaskCategoryBadge category="frontend" />
          <TaskCategoryBadge category="backend" />
        </div>
        <div className="relative">
          <div
            className="border rounded py-1.5 px-2 border-dashed border-gray-300 dark:border-slate-600 hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors z-50"
            onClick={() => setToggleElement({...toggleElement, color: !toggleElement.color})}
          >
            <div className={`size-3 rounded-full ${taskColors[color].bg}`}></div>
          </div>
          {toggleElement.color && (
            <div className="absolute right-0 bg-white border border-gray-300 dark:bg-slate-800 dark:border-slate-600 text-sm p-1 rounded-md flex flex-col select-none">
              <div className="hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center gap-2 p-1 rounded-xs cursor-pointer">
                <span className={`rounded-full size-3 ${taskColors.blue.bg}`}></span>
                <span>Azul</span>
              </div>
              <div className="hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center gap-2 p-1 rounded-xs cursor-pointer">
                <span className={`rounded-full size-3 ${taskColors.red.bg}`}></span>
                <span>Vermelho</span>
              </div>
              <div className="hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center gap-2 p-1 rounded-xs cursor-pointer">
                <span className={`rounded-full size-3 ${taskColors.green.bg}`}></span>
                <span>Verde</span>
              </div>
              <div className="hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center gap-2 p-1 rounded-xs cursor-pointer">
                <span className={`rounded-full size-3 ${taskColors.yellow.bg}`}></span>
                <span>Amarelo</span>
              </div>
              <div className="hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center gap-2 p-1 rounded-xs cursor-pointer">
                <span className={`rounded-full size-3 ${taskColors.purple.bg}`}></span>
                <span>Roxo</span>
              </div>
              <div className="hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center gap-2 p-1 rounded-xs cursor-pointer">
                <span className={`rounded-full size-3 ${taskColors.pink.bg}`}></span>
                <span>Rosa</span>
              </div>
              <div className="hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center gap-2 p-1 rounded-xs cursor-pointer">
                <span className={`rounded-full size-3 ${taskColors.orange.bg}`}></span>
                <span>Laranja</span>
              </div>
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
            <option value="low">Baixa</option>
            <option value="medium">Média</option>
            <option value="high">Alta</option>
        </select>
    </div>

    <div className="my-3">
        <ProgressBar />
    </div>

    <div className="my-5 flex justify-between">
      <TaskPriorityBadge priority="low"/>
      <button
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
      <Button variant="transparent">
        <PencilSimpleIcon weight="bold" />
      </Button>
      <Button variant="transparent">
        <TrashIcon className="text-danger" weight="bold" />
      </Button>
    </footer>
</div>
  )
}