import { CaretDownIcon, CaretRightIcon, CheckIcon, PlusIcon, XIcon } from "@phosphor-icons/react";
import Button from "./Button";

type SubtasksProps = {
  title: string;
  open: boolean;
  onClick: () => void;
}

export default function Subtasks(props: SubtasksProps) {
  const { title, open, onClick } = props;

  return (
    <>
      <div onClick={onClick} className="flex gap-1.5 items-center hover:bg-gray-100 dark:hover:bg-slate-700 p-1 rounded transition-colors cursor-pointer">
        {open ? (
          <CaretDownIcon weight="bold" className="text-sm"/>
        ) : (
          <CaretRightIcon weight="bold" className="text-sm"/>
        )}
        <span className="text-sm select-none">Subtarefas</span>
      </div>

      {open && (
        <div className="border-l-2 border-gray-300 dark:border-slate-700 p-1 pl-3">
          <ul className="space-y-1">
            <li className="flex items-center justify-between">
              <div className="peer flex items-start gap-2">
                <div className="relative peer">
                  <input name="subtask" id="subtask" type="checkbox" className="peer appearance-none size-4 border border-gray-300 rounded-xs dark:border-slate-600 checked:bg-success transition-colors" />
                  <CheckIcon weight="bold" className="absolute top-0 hidden peer-checked:block pointer-events-none text-black" />
                </div>
                <label className="text-sm select-none peer-has-checked:line-through" htmlFor="subtask">
                  {title}
                </label>
              </div>
              <Button className="rounded!" variant="transparent">
                <XIcon className="dark:text-slate-500" />
              </Button>
            </li>
            <li className="flex items-center gap-1.5 text-xs cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700 p-1 rounded transition-colors w-fit">
              <PlusIcon weight="bold" className="text-sm"/>
              Nova subtarefa
            </li>
          </ul>
        </div>
      )}
    </>
  )
}