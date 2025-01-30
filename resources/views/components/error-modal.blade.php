<div>
  <div>
    <i class="ph-fill ph-x-circle text-8xl text-danger"></i>
    <header class="text-3xl font-medium">
      Erro!
    </header>

    <main>
      {{ $slot }}
    </main>

    <footer>
      <x-button id="close-error-modal-btn">Fechar</x-button>
    </footer>
  </div>
</div>