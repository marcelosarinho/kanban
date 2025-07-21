export default function ProgressBar() {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <small>Progresso</small>
        <small>66%</small>
      </div>

      <progress className="h-2 bg-success rounded-full w-full" value="66" max="100"></progress>
    </div>
  )
}