import type { ComponentProps } from "react";

export default function ProfileCardBody(props: ComponentProps<'div'>) {
  const { children, className, ...rest } = props;

  return (
    <div {...rest} className={` ${className ?? ''}`}>
      {children}
    </div>
  )
}