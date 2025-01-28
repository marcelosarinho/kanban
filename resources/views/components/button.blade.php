<button
    id="{{ $id }}"
    type="{{ $type }}"
    form="{{ $form ?? null }}"
    class="flex items-center rounded-md gap-1 px-3 py-2 shadow {{ $color }} hover:-translate-y-1 transition text-{{ $textColor }}
    text-sm font-medium {{ $border ?? '' }} {{ $borderColor ?? '' }}"
    onclick="{{ $onclick ?? null }}"
>
    {{ $slot }}
</button>