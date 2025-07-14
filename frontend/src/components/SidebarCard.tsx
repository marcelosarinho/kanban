import Button from "./Button";

export default function SidebarCard() {
  return (
    <div className="bg-gray-100 py-2 px-3 rounded border border-gray-300 dark:bg-slate-800 dark:border-slate-700 dark:text-gray-300 hover:border-primary transition-colors">
      <h2 className="font-semibold truncate">Projeto</h2>
      <h6 className="text-sm truncate leading-tight">Descrição</h6>

      <div className="flex items-center justify-end">
        <Button variant="transparent">
          <i className="ph ph-trash text-lg text-danger group-hover:text-red-600 transition-colors"></i>
        </Button>
      </div>
    </div>
  )
}