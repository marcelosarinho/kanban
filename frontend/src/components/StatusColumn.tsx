import type { ReactElement } from "react";
import Searchbar from "./Searchbar";
import { TASK_STATUSES } from "../libs/constants";
import Button from "./Button";
import { PlusIcon } from "@phosphor-icons/react";

type StatusColumnProps = {
  status: keyof typeof TASK_STATUSES;
  children?: ReactElement | undefined | null;
}

export default function StatusColumn(props: StatusColumnProps) {
  const { status, children } = props;

  return (
    <div className="col-lg-3 h-100">
      <div className="flex items-center justify-between mb-2">
        <header className="text-2xl font-bold dark:text-gray-300">
          {TASK_STATUSES[status]}
        </header>

        <Button variant="success">
          <PlusIcon weight="bold" className="text-xs" />
        </Button>
      </div>
      <Searchbar className="mb-2" />
      <div className="flex flex-col max-h-full gap-3 p-3 w-72 rounded border border-gray-300 bg-white dark:bg-slate-900 dark:border-slate-700 overflow-x-auto">
        {children}
      </div>
    </div>
  )
}