<button
    id="{{ $id }}"
    type="{{ $type }}"
    class="flex items-center gap-1 px-4 py-1.5 {{ $color }} border-2 border-black shadow-flat
    hover:-translate-y-0.5 transition text-{{ $textColor }} text-sm"
    onclick="{{ $onclick ?? null }}"
>
    {{ $slot }}
</button>