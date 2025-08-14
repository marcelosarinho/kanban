type ProgressBarProps = {
  progress: number;
}

export default function ProgressBar(props: ProgressBarProps) {
  const { progress } = props;

  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <small>Progresso</small>
        <small>{progress.toFixed(0)}%</small>
      </div>

      <progress className="h-2 bg-success rounded-full w-full" value={progress} max="100"></progress>
    </div>
  )
}