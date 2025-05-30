<div class="p-4 border border-l-4 border-blue-500 rounded-md bg-white dark:bg-slate-800 dark:border-blue-700 dark:text-gray-300">
    <div class="flex items-center gap-1 mb-3">
		<input class="size-4 border border-red-500" type="checkbox" name="teste" id="teste">
		<label for="teste">Concluída</label>
	</div>
	
	<header class="flex justify-between items-center">
        <div
            class="h-fit flex items-center text-xs font-semibold bg-blue-100 text-blue-700 border-[1.5px] rounded-full px-3 py-0.5 border-blue-300">
            Badge</div>
        <div
            class="border rounded py-1.5 px-2 border-dashed border-gray-300 hover:cursor-pointer hover:bg-gray-100 transition-colors">
            <div class="size-3 bg-blue-500 rounded-full"></div>
        </div>
    </header>

    <div class="my-2">
        <h1 class="font-medium text-lg">Tarefa</h1>
        <p class="text-sm leading-tight">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi, optio.</p>
    </div>

	<div class="flex justify-end my-3">
		<select class="text-sm border rounded p-0.5" name="priority" id="priority">
			<option value="low">Baixa</option>
			<option value="medium">Média</option>
			<option value="high">Alta</option>
		</select>
	</div>

    <div class="my-3">
        <div class="flex justify-between">
            <small>Progresso</small>
            <small>20%</small>
        </div>

        <div class="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-full">
            <div class="h-2 bg-green-500 dark:bg-green-700 rounded-full w-2/3"></div>
        </div>
    </div>

    <div class="my-5 flex justify-between">
        <div
            class="w-fit flex items-center text-xs font-semibold bg-blue-100 text-blue-700 border-[1.5px] rounded-full px-3 py-0.5 border-blue-300">
            Badge</div>
        <button>
            <i class="ph-bold ph-chat"></i>
        </button>
    </div>
</div>
