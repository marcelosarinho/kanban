import { Tooltip, type ITooltip } from "react-tooltip";

export default function CustomTooltip(props: ITooltip) {
  const { content, anchorSelect, ...rest } = props;

  return (
    <Tooltip
      content={content}
      anchorSelect={anchorSelect}
      disableStyleInjection
      className="rounded border border-gray-300 bg-white dark:bg-slate-900 dark:border-slate-700 px-2 py-1 text-sm"
      {...rest}
    />
  )
}