<div id="error-modal" class="z-[60] hidden absolute bg-black/35 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-full">
  <div class="flex flex-col items-center w-1/2 bg-white absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
    gap-y-6 rounded p-5 dark:bg-slate-900 dark:text-gray-300">
    <i class="ph-fill ph-x-circle text-8xl text-danger"></i>
    <header class="text-3xl font-medium">
      Erro!
    </header>

    <main class="text-lg">
      {{ $slot }}
    </main>

    <footer>
      <x-button
        onclick="closeErrorModal()"
        type="button"
        bgColor="bg-danger"
        textColor="text-white"
        id="close-error-modal-btn"
      >
        Fechar
      </x-button>
    </footer>
  </div>
</div>