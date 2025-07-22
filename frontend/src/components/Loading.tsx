import { CircleNotchIcon } from "@phosphor-icons/react";

type LoadingProps = {
  loading: boolean;
}

export default function Loading(props: LoadingProps) {
  const { loading } = props;

  return (
    loading && <CircleNotchIcon className="mr-1 animate-spin text-lg" />
  )
}