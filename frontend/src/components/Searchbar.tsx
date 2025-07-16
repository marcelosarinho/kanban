import { MagnifyingGlassIcon } from "@phosphor-icons/react";

export default function Searchbar() {
  return (
    <div className="has-focus-visible:border has-focus-visible:border-primary mt-6 rounded py-0.5 px-1 bg-gray-50 h-fit flex items-center justify-end border border-gray-300 dark:bg-slate-800 dark:border-slate-700 w-full focus-visible:border-primary">
      <input name="search" type="text" className="outline-none px-0.5 text-sm bg-gray-50 dark:bg-slate-800 dark:text-gray-300 w-full" />
      <button className="flex items-center p-0.5">
        <MagnifyingGlassIcon className="text-xl dark:text-gray-300" />
      </button>
    </div>
  )
}