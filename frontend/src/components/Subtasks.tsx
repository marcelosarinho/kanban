import { CaretDownIcon, CaretRightIcon, CheckIcon } from "@phosphor-icons/react";

export default function Subtasks() {
  return (
    <>
      <div className="flex gap-1.5 items-center hover:bg-gray-100 dark:hover:bg-slate-700 p-1 rounded transition-colors cursor-pointer">
          <CaretRightIcon weight="bold" className="text-sm"/>
          <CaretDownIcon weight="bold" className="text-sm"/>
          <span className="text-sm">Subtarefas (2/4)</span>
        </div>

        <div className="flex items-center gap-1.5 border-l border-l-red-500 p-1 pl-2">
          <input name="subtask" id="subtask" type="checkbox" className="peer appearance-none size-4 border border-gray-300 rounded-xs dark:border-slate-600 checked:bg-success transition-colors" />
          <CheckIcon weight="bold" className="absolute hidden peer-checked:block pointer-events-none text-black" />
          <label className="text-sm select-none flex items-center has-checked:line-through gap-1.5" htmlFor="subtask">
            Subtarefa
          </label>
        </div>
    </>
  )
}