<div
  onclick="{{ $openProject }}"
  id="project_{{ $id }}"
  class="bg-gray-100 py-2 px-3 rounded border border-gray-300
dark:bg-slate-800 dark:border-slate-700 dark:text-gray-300
  hover:border-primary transition-colors"
>
  <h2 id="project-name" class="font-semibold truncate">{{ $name }}</h2>
  <h6 id="project-description" class="text-sm truncate leading-tight">{{ $description }}</h6>
  <button onclick="{{ $openModal }}" class="group flex mt-2">
    <i class="ph ph-trash text-xl text-danger group-hover:text-red-600 transition-colors"></i>
  </button>
</div>