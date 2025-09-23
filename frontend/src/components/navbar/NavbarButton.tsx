import { type ComponentProps } from "react";

type NavbarButtonProps = ComponentProps<'button'>;

export default function NavbarButton(props: NavbarButtonProps) {

  return (
    <div>
      <button
        className="flex items-center justify-center cursor-pointer hover:bg-gray-200 dark:hover:bg-slate-800 rounded-full p-1"
        {...props}
      />
    </div>
  )
}