export default function ProgressBar() {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <small>Progresso</small>
        <small>20%</small>
      </div>

      <div className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-full">
        <div className="h-2 bg-green-500 dark:bg-green-700 rounded-full w-2/3"></div>
      </div>
    </div>
  )
}