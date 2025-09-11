type UserFormErrorProps = {
  error?: string;
}

export default function UserFormError(props: UserFormErrorProps) {
  const { error } = props;

  return (
    <div className="p-2 bg-danger/20 border border-danger text-red-800 dark:text-red-400 text-sm rounded animate-slide-in-from-bottom">
      {error}
    </div>
  )
}