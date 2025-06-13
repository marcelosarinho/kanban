
@php
    $priorities = [
        'low' => 'Baixa',
        'medium' => 'Média',
        'high' => 'Alta',
    ];
@endphp

<div class="w-fit flex items-center text-xs font-semibold bg-blue-100 text-blue-700 border-[1.5px] rounded-full px-3 py-0.5 border-blue-300">
    {{ $priority }}
</div>