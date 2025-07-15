// type TaskProps = {
//   name: string;
//   description: string;
// }

import TaskCategoryBadge from "./TaskCategoryBadge"

export default function Task() {
  return (
    <div className="p-4 border border-l-4 border-blue-500 rounded-md bg-white dark:bg-slate-800 dark:border-blue-700 dark:text-gray-300">
    <input type="hidden" name="" id="" />

    <header className="flex justify-between items-center">
        <div className="flex flex-wrap gap-1">
          <TaskCategoryBadge />
          <TaskCategoryBadge />
        </div>
        <div className="border rounded py-1.5 px-2 border-dashed border-gray-300 hover:cursor-pointer hover:bg-gray-100 transition-colors">
            <div className="size-3 bg-blue-500 rounded-full"></div>
        </div>
    </header>

    <div className="my-2">
        <h1 className="font-medium text-lg">Nome</h1>
        <p className="text-sm leading-tight">Descrição</p>
    </div>

    <div className="flex justify-between items-end my-3">
        <div className="flex items-center gap-1">
            <input className="size-4" type="checkbox" name="" id=""/>
            <label className="text-sm" htmlFor="">Concluída</label>
        </div>
        <select className="text-sm border rounded p-0.5" name="" id="">
            <option value="low">Baixa</option>
            <option value="medium">Média</option>
            <option value="high">Alta</option>
        </select>
    </div>

    <div className="my-3">
        <div className="flex justify-between">
            <small>Progresso</small>
            <small>20%</small>
        </div>

        <div className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-full">
            <div className="h-2 bg-green-500 dark:bg-green-700 rounded-full w-2/3"></div>
        </div>
    </div>

    <div className="my-5 flex justify-between">
        <button>
            <i className="ph-bold ph-chat"></i>
        </button>
    </div>
</div>
  )
}