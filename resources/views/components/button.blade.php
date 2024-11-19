<button
    id="{{ $id }}"
    type="{{ $type }}"
    class="flex items-center gap-1 px-4 py-1.5 bg-{{ $color }}-{{ $shade }} border-2 border-black shadow-flat
    hover:-translate-y-0.5 transition"
>
    {{ $slot }}
</button>