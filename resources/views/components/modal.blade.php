<div id="{{ $id }}" class="hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-full z-50 bg-black/35">
  <div class="w-1/2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white opacity-100 p-5 rounded dark:bg-slate-900">
    <header class="mb-3 flex justify-between">
      <h1 class="text-xl font-bold dark:text-white">{{ $header }}</h1>
      <i class="ph ph-x cursor-pointer hover:text-blue-500 dark:text-white" onclick="{{ $closeModal }}"></i>
    </header>
    
    <main class="mb-4">
      {{ $slot }}
    </main>
  
    <footer class="flex gap-3 justify-end">
      {{ $footer }}
    </footer>
  </div>
</div>