<button
    id="{{ $id }}"
    type="{{ $type }}"
    form="{{ $form ?? null }}"
    class="flex items-center rounded-md gap-1 px-3 py-2 shadow {{ $bgColor }} hover:-translate-y-1 transition {{ $textColor }}
    text-sm font-medium {{ $border ?? '' }} {{ $borderColor ?? '' }}"
    onclick="{{ $onclick ?? null }}"
>
    {{ $slot }}
</button>