import type { ComponentProps } from "react";

type Variant = 'error' | 'warning' | 'success';

type UserFormMessageProps = {
  variant: Variant;
  message?: string;
} & ComponentProps<'div'>

const userFormVariant: Record<Variant, string> = {
  error: 'bg-danger/20 border-danger text-red-800 dark:text-red-400',
  warning: 'bg-warning/20 border-warning text-yellow-800 dark:text-yellow-400',
  success: 'bg-success/20 border-success text-green-800 dark:text-green-400',
}

export default function UserFormMessage(props: UserFormMessageProps) {
  const { variant, message, className } = props;

  return (
    <div className={`p-2 border text-sm rounded animate-in ${userFormVariant[variant]} ${className}`}>
      {message}
    </div>
  )
}