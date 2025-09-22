import type { InputHTMLAttributes, ReactElement, SetStateAction } from "react";
import Searchbar from "@components/Searchbar";
import { TASK_STATUSES } from "@libs/constants";
import Button from "@components/Button";
import { PlusIcon } from "@phosphor-icons/react";
import type { TaskStatusOption } from "@custom-types/task";

type TaskStatusProps = {
  status: TaskStatusOption;
  children?: ReactElement | ReactElement[] | undefined | null;
  createTask: () => void;
  setTaskQuery: (value: SetStateAction<{ todo: string; in_progress: string; testing: string; implemented: string; }>) => void;
  value: InputHTMLAttributes<HTMLInputElement>['value'];
}

export default function TaskStatus(props: TaskStatusProps) {
  const { status, children, createTask, setTaskQuery, value} = props;

  return (
    <div className="col-lg-3 max-h-3/6">
      <div className="flex items-center justify-between mb-2">
        <header className="text-2xl font-bold dark:text-gray-300">
          {TASK_STATUSES[status]}
        </header>

        <Button variant="success" onClick={createTask}>
          <PlusIcon weight="bold" className="text-xs" />
        </Button>
      </div>

      <Searchbar
        onSearch={(e) => setTaskQuery((prev) => ({ ...prev, [status]: e.target.value }))}
        className="mb-2"
        name={`${status}_query`}
        value={value}
      />

      <div className="flex flex-col max-h-1/3 gap-3 p-3 w-72 rounded border border-gray-300 bg-white dark:bg-slate-900 dark:border-slate-700 overflow-y-auto">
        {children}
      </div>
    </div>
  )
}