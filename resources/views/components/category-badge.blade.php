@php
    $colors = [
        'purple' => 'badge-purple',
        'blue' => 'badge-blue'
    ]
@endphp

<label class="{{ $colors[$color] }} dark:bg-slate-800 dark:border-slate-950 dark:text-gray-300 has-[:disabled]:opacity-50 border-[1.5px]
    transition-colors border-gray-300 rounded-full py-1 px-2 cursor-pointer"
>
    <input class="hidden category-input" type="checkbox" id="{{ $id }}">
    {{ $label }}
</label>