export default function ProfileInfoSkeleton() {
  return (
    <div className="p-4 w-full border rounded-lg bg-white border-neutral-300 dark:bg-slate-900 dark:border-slate-700 animate-pulse">
      <header className="mb-3">
        <div className="rounded h-5 w-1/5 bg-gray-300 dark:bg-slate-600 animate-pulse mb-1"></div>
        <div className="rounded h-5 w-1/3 bg-gray-300 dark:bg-slate-600 animate-pulse"></div>
      </header>

      <div className="flex flex-col gap-3">
        <div>
          <div className="rounded h-5 w-1/12 bg-gray-300 dark:bg-slate-600 animate-pulse mb-1"></div>
          <div className="rounded h-7 w-full bg-gray-300 dark:bg-slate-600 animate-pulse"></div>
        </div>
        <div>
          <div className="rounded h-5 w-1/12 bg-gray-300 dark:bg-slate-600 animate-pulse mb-1"></div>
          <div className="rounded h-7 w-full bg-gray-300 dark:bg-slate-600 animate-pulse"></div>
        </div>

        <div>
          <div className="rounded h-9 w-36 bg-gray-300 dark:bg-slate-600 animate-pulse mb-1"></div>
        </div>
      </div>
    </div>
  )
}