export default function TaskSkeleton() {
  return (
    <div className={`p-4 border border-l-4 task-none-border rounded-md bg-white dark:bg-slate-800 dark:text-gray-300`}>
          <header className="flex justify-between items-center">
              <div className="flex flex-wrap gap-1">
                <div className="rounded-full h-5 w-20 bg-gray-300 dark:bg-slate-600 animate-pulse"></div>
                <div className="rounded-full h-5 w-20 bg-gray-300 dark:bg-slate-600 animate-pulse"></div>
              </div>
              <div className="relative">
                <div className="rounded-sm h-6 w-7 bg-gray-300 dark:bg-slate-600 animate-pulse"></div>
              </div>
          </header>
    
          <div className="my-3">
              <div className="rounded-full w-1/3 h-4 bg-gray-300 dark:bg-slate-600 animate-pulse mb-2"></div>
              <div className="rounded-full w-2/3 h-3 bg-gray-300 dark:bg-slate-600 animate-pulse"></div>
          </div>
    
          <div className="flex justify-between items-center my-5 h-6">
              <div className="flex items-center gap-1.5 font-medium w-2/4">
                  <div className="rounded-xs w-5 h-4 bg-gray-300 dark:bg-slate-600 animate-pulse"></div>
                  <div className="rounded-full h-3 w-full bg-gray-300 dark:bg-slate-600 animate-pulse"></div>
              </div>
              <div className="rounded h-full w-1/4 bg-gray-300 dark:bg-slate-600 animate-pulse"></div>
          </div>
    
          <div className="my-3">
              <div className="rounded-full h-2.5 w-full bg-gray-300 dark:bg-slate-600 animate-pulse"></div>
          </div>
    
          <div className="my-5 flex justify-between items-center">    
              <div className="rounded-full w-2/4 h-5 bg-gray-300 dark:bg-slate-600 animate-pulse"></div>
              <div className="rounded-full size-5 bg-gray-300 dark:bg-slate-600 animate-pulse"></div>
          </div>
    
          <footer className="flex justify-between items-center">
            <div className="rounded-md bg-gray-300 dark:bg-slate-600 h-7 w-24 animate-pulse"></div>
            <div className="rounded-full size-5 bg-gray-300 dark:bg-slate-600 animate-pulse"></div>
          </footer>
        </div>
  )
}