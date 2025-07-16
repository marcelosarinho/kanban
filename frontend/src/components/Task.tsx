// type TaskProps = {
//   name: string;
//   description: string;
// }

import TaskCategoryBadge from "./TaskCategoryBadge"
import TaskPriorityBadge from "./TaskPriorityBadge"
import ProgressBar from "./ProgressBar"
import { useState } from "react"
import { ChatIcon, CheckIcon, PencilSimpleIcon, TrashIcon } from "@phosphor-icons/react";
import Button from "./Button";
import Textarea from "./Textarea";

export default function Task() {
  const [toggleColorDropdown, setToggleColorDropdown] = useState(false);
  const [toggleComment, setToggleComment] = useState(false);

  return (
    <div className="p-4 border border-l-4 border-blue-500 rounded-md bg-white dark:bg-slate-800 dark:border-blue-700 dark:text-gray-300">
    <input type="hidden" name="" id="" />

    <header className="flex justify-between items-center">
        <div className="flex flex-wrap gap-1">
          <TaskCategoryBadge category="frontend" />
          <TaskCategoryBadge category="backend" />
        </div>
        <div className="relative">
          <div
            className="border rounded py-1.5 px-2 border-dashed border-gray-300 dark:border-slate-600 hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors z-50"
            onClick={() => setToggleColorDropdown(!toggleColorDropdown)}
          >
            <div className="size-3 bg-blue-500 rounded-full"></div>
          </div>
          {toggleColorDropdown && (
            <div className="absolute right-0 bg-white border border-gray-300 dark:border-slate-600 text-sm p-1 rounded-md flex flex-col select-none">
              <div className="hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center gap-2 p-1 rounded-xs cursor-pointer">
                <span className="bg-blue-500 rounded-full size-3"></span>
                <span>Azul</span>
              </div>
              <div className="hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center gap-2 p-1 rounded-xs cursor-pointer">
                <span className="bg-red-500 rounded-full size-3"></span>
                <span>Vermelho</span>
              </div>
              <div className="hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center gap-2 p-1 rounded-xs cursor-pointer">
                <span className="bg-green-500 rounded-full size-3"></span>
                <span>Verde</span>
              </div>
              <div className="hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center gap-2 p-1 rounded-xs cursor-pointer">
                <span className="bg-yellow-500 rounded-full size-3"></span>
                <span>Amarelo</span>
              </div>
              <div className="hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center gap-2 p-1 rounded-xs cursor-pointer">
                <span className="bg-purple-500 rounded-full size-3"></span>
                <span>Roxo</span>
              </div>
              <div className="hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center gap-2 p-1 rounded-xs cursor-pointer">
                <span className="bg-pink-500 rounded-full size-3"></span>
                <span>Rosa</span>
              </div>
              <div className="hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center gap-2 p-1 rounded-xs cursor-pointer">
                <span className="bg-orange-500 rounded-full size-3"></span>
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
            <CheckIcon weight="bold" className="hidden peer-checked:block absolute text-black" />
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
        onClick={() => setToggleComment(!toggleComment)}
      >
        <ChatIcon weight="bold" />
      </button>
    </div>

    {toggleComment && (
      <div className="mb-2">
        <Textarea />
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