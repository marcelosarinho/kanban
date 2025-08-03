import { CircleNotchIcon } from "@phosphor-icons/react";

type LoadingProps = {
  loading: boolean;
  className?: string;
}

export default function Loading(props: LoadingProps) {
  const { loading, className } = props;

  return (
    loading && <CircleNotchIcon className={`animate-spin ${className ?? ''}`} />
  )
}