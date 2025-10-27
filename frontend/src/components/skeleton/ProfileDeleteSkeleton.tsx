export default function ProfileDeleteSkeleton() {
  return (
    <div className="p-4 w-full border border-danger/50 rounded-lg bg-white dark:bg-slate-900 animate-pulse">
      <header className="mb-3">
        <div className="rounded h-5 w-1/5 bg-gray-300 dark:bg-slate-600 animate-pulse mb-1"></div>
        <div className="rounded h-5 w-1/2 bg-gray-300 dark:bg-slate-600 animate-pulse"></div>
      </header>

      <div className="mt-8 flex flex-col md:flex-row gap-3 justify-between md:items-center">
        <div className="flex flex-col animate-pulse w-3/4">
          <div className="rounded h-5 w-1/4 bg-gray-300 dark:bg-slate-600 animate-pulse mb-1"></div>
          <div className="rounded h-5 w-5/6 bg-gray-300 dark:bg-slate-600 animate-pulse"></div>
        </div>
        <div className="rounded h-9 w-full md:w-36 bg-danger/50 animate-pulse"></div>
      </div>
    </div>
  )
}