export default function SidebarCardSkeleton() {
  return (
    <div className="bg-gray-100 py-2 px-3 rounded border border-gray-300 dark:bg-slate-800 dark:border-slate-700 dark:text-gray-300">
      <div className="bg-gray-300 h-2.5 w-1/3 rounded mb-3 animate-pulse"></div>

      <div className="bg-gray-300 h-2.5 w-2/3 rounded mb-3 animate-pulse"></div>

      <div className="flex items-center justify-end gap-2">
        <div className="bg-gray-300 size-4 rounded-full animate-pulse"></div>
        <div className="bg-gray-300 size-4 rounded-full animate-pulse"></div>
      </div>
    </div>
  )
}