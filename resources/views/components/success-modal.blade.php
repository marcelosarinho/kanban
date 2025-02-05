<div id="success-modal" {{ $attributes->merge(['class' => 'hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-full bg-black/35']) }}>
  <div class="w-1/2 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-5 rounded flex flex-col
    items-center gap-y-6 dark:bg-slate-900 dark:text-gray-300">
    <i class="ph-fill ph-check-fat text-8xl text-success"></i>
    <header class="text-3xl font-medium">
      Sucesso!
    </header>
  
    <main class="text-lg">
      {{ $slot }}
    </main>
  
    <footer>
      <x-button
        onclick="closeSuccessModal()"
        id="close-success-modal-btn" type="button" bgColor="bg-success" textColor="text-black"
      >
        OK
      </x-button>
    </footer>
  </div>
</div>