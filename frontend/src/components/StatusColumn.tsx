import type { ReactElement } from "react";
import Searchbar from "./Searchbar";

type StatusColumnProps = {
  status: string;
  children?: ReactElement | undefined | null;
}

export default function StatusColumn(props: StatusColumnProps) {
  const { status, children } = props;

  return (
    <div className="col-lg-3 h-100">
      <header className="text-2xl font-bold mb-2 dark:text-gray-300">
        {status}
      </header>
      <Searchbar className="mb-3" />
      <div className="flex flex-col max-h-full gap-3 p-3 w-72 rounded border border-gray-300 bg-white dark:bg-slate-900 dark:border-slate-700 overflow-x-auto">
        {children}
      </div>
    </div>
  )
}