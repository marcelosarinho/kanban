import { CaretDownIcon, CaretRightIcon, CheckIcon } from "@phosphor-icons/react";

export default function Subtasks() {
  return (
    <>
      <div className="flex gap-1.5 items-center hover:bg-gray-100 dark:hover:bg-slate-700 p-1 rounded transition-colors cursor-pointer">
          <CaretRightIcon weight="bold" className="text-sm"/>
          <CaretDownIcon weight="bold" className="text-sm"/>
          <span className="text-sm">Subtarefas (2/4)</span>
        </div>

        <div className="border-l-2 border-gray-300 dark:border-slate-700 p-1 pl-3">
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <div className="relative peer">
                <input name="subtask" id="subtask" type="checkbox" className="peer appearance-none size-4 border border-gray-300 rounded-xs dark:border-slate-600 checked:bg-success transition-colors" />
                <CheckIcon weight="bold" className="absolute top-0 hidden peer-checked:block pointer-events-none text-black" />
              </div>
              <label className="text-sm select-none peer-has-checked:line-through" htmlFor="subtask">
                Subtarefa
              </label>
            </li>
          </ul>
        </div>
    </>
  )
}