import type { ReactElement } from "react";

export default function TaskStatusSkeleton({ children }: { children?: ReactElement | ReactElement[] | undefined | null; }) {
  return (
    <div className="col-lg-3 h-3/4">
      <div className="flex justify-between mb-2">
        <div className="rounded-full w-36 h-8 bg-gray-300 dark:bg-slate-600 animate-pulse"></div>

        <div className="rounded-md w-9 px-3 py-2 bg-gray-300 dark:bg-slate-600 animate-pulse"></div>
      </div>

      <div className="rounded bg-gray-300 dark:bg-slate-600 animate-pulse h-7 mb-2"></div>
      
      <div className="flex flex-col max-h-full gap-3 p-3 w-72 rounded border border-gray-300 bg-white dark:bg-slate-900 dark:border-slate-700 overflow-y-auto">
        {children}
      </div>
    </div>
  )
}