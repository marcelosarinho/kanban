<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="dark">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @vite('resources/css/app.css')

    <title>Laravel</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=SUSE:wght@100..800&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/@phosphor-icons/web"></script>
</head>

<body class="h-screen font-suse bg-neutral-100">
    <aside id="leftbar" class="fixed w-52 bg-white h-full border-r-2 border-gray-200 dark:bg-zinc-800 dark:border-zinc-950">
        <div id="sidebar" class="flex flex-col items-center px-2">
            <h3 class="text-xl font-semibold text-center mb-4 mt-2 dark:text-white">Projetos</h3>
            <x-button id="btn-add-project" type="button" color="bg-blue-500" textColor="white">
                <i class="ph-bold ph-plus"></i>
                Adicionar projeto
            </x-button>

            <div
                class="mt-6 rounded py-0.5 px-1 bg-gray-50 h-fit flex items-center border-2
                dark:bg-neutral-700 dark:border-zinc-950"
            >
                <input type="text" class="outline-none px-0.5 text-sm bg-gray-50 dark:bg-neutral-700 dark:text-white">
                <button class="flex items-center p-0.5">
                    <i class="ph ph-magnifying-glass text-xl dark:text-white"></i>
                </button>
            </div>
            <div id="projects" class="mt-4 flex flex-col w-full gap-3">
                @foreach ($projects as $project)
                    <x-sidebar-card name="{{ $project->name }}" description="{{ $project->description }}" />
                @endforeach
            </div>
        </div>
    </aside>
    <section id="rightbar" class="ml-52">
        <nav id="topbar"
            class="z-[1] fixed h-12 bg-white flex justify-end px-4 py-7 gap-3 items-center left-52 right-0 border-b-2 border-gray-200
            dark:bg-zinc-800 dark:border-zinc-950"
        >
            <button id="btn-theme">
                <i class="ph ph-sun text-2xl dark:text-white"></i>
            </button>
            <button id="btn-fullscreen">
                <i class="ph ph-arrows-out text-2xl dark:text-white"></i>
            </button>
            <div id="theme-dropdown" class="absolute right-12 bg-white rounded-md mt-2 py-2 w-28 hidden">
                <div class="px-2 py-1 flex items-center hover:bg-gray-200 cursor-pointer">
                    <i class="mr-2 ph ph-moon text-xl"></i>
                    Escuro
                </div>
                <div class="px-2 py-1 flex items-center hover:bg-gray-200 cursor-pointer">
                    <i class="mr-2 ph ph-sun text-xl"></i>
                    Claro
                </div>
                <div class="px-2 py-1 flex items-center hover:bg-gray-200 cursor-pointer">
                    <i class="mr-2 ph ph-moon-stars text-xl"></i>
                    Sistema
                </div>
            </div>
        </nav>

        <main class="flex flex-col items-center justify-center px-6 pt-20 dark:bg-zinc-900 bg-slate-100">
            <h1 class="text-3xl font-bold mb-4 dark:text-white">
                Kanban
            </h1>

            <div class="flex justify-between w-full mb-4">
                <x-button id="btn-add-card" type="button" color="bg-blue-500" textColor="white">
                    <i class="ph-bold ph-plus"></i>
                    Adicionar tarefa
                </x-button>
    
                <x-button id="add-card" type="button" color="bg-green-400" textColor="dark">
                    <i class="ph-bold ph-check"></i>
                    Salvar
                </x-button>
            </div>

            <div class="flex gap-4">
                <div id="to-do-section" class="col-lg-3 h-100">
                    <header class="text-2xl font-bold mb-2 dark:text-white">
                        A fazer
                    </header>
                    <div class="p-3 h-96 w-72 bg-white dark:bg-zinc-800"></div>
                </div>
                <div id="in-progress-section" class="col-lg-3 h-100">
                    <header class="text-2xl font-bold mb-2 dark:text-white">
                        Em progresso
                    </header>
                    <div class="h-96 w-72 bg-white dark:bg-zinc-800">
                        <div></div>
                    </div>
                </div>
                <div id="testing-section" class="col-lg-3 h-100">
                    <header class="text-2xl font-bold mb-2 dark:text-white">
                        Testando
                    </header>
                    <div class="h-96 w-72 bg-white dark:bg-zinc-800">
                        <div></div>
                    </div>
                </div>
                <div id="implement-section" class="col-lg-3 h-100">
                    <header class="text-2xl font-bold mb-2 dark:text-white">
                        Implementado
                    </header>
                    <div class="h-96 w-72 bg-white dark:bg-zinc-800">
                        <div></div>
                    </div>
                </div>
            </div>
        </main>
    </section>

    <div id="new-project-modal"
        class="hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-full z-50 bg-black/35">
        <div
            class="w-1/2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white opacity-100 p-5 rounded">
            <header class="mb-3 flex justify-between">
                <h1 class="text-xl font-bold">Novo projeto</h1>

                <i class="ph-bold ph-x cursor-pointer hover:text-blue-500" onclick="closeModal()"></i>
            </header>
            <main class="mb-4">
                <form id="create-project-form">
                    @csrf
                    <div class="mb-3">
                        <label class="block mb-1" for="name">Nome</label>
                        <input name="name" id="name" type="text" class="px-2 py-1 border rounded w-full">
                        <p id="name-error" class="text-red-500 text-sm mt-1 hidden">Nome obrigatório!</p>
                    </div>

                    <div>
                        <label class="block mb-1" for="description">Descrição</label>
                        <textarea class="px-2 py-1 border rounded w-full" name="description" id="description" cols="30"
                            rows="3"></textarea>
                        <p id="description-error" class="text-red-500 text-sm mt-1 hidden">Descrição obrigatória!</p>
                    </div>
                </form>
            </main>
            <footer class="flex gap-3 justify-end">
                {{-- <button class="bg-red-500 text-white rounded px-2 py-1" onclick="closeModal()">
                    <i class="ph ph-x mr-1"></i> Cancelar
                </button> --}}

                <x-button id="btn-close-modal" type="button" color="red" shade="500" textColor="white" onclick="closeModal()">
                    <i class="ph-bold ph-x"></i>
                    Cancelar
                </x-button>

                <x-button id="btn-create-new-project" type="submit" color="blue" shade="500" textColor="white">
                    <i class="ph-bold ph-plus"></i>
                    Criar
                </x-button>
            </footer>
        </div>
    </div>
</body>

<script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
{{-- <script src="helper.js"></script> --}}
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
<script>
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    function setCardBgColor(element) {
        let colors = element.value.split(" ");
        $('#card-inicial').css('background-color', colors[0]);
        $('#card-inicial').css('border-color', colors[1]);
        $('hr').css('border-color', colors[1]);
    }

    function closeModal() {
        $('#new-project-modal').toggle();
    }

    $('#btn-add-card').on('click', function () {
        $('#to-do-section > div').append(`
            <div id="card-inicial" class="bg-white rounded-md border-2 px-2 py-3">
                <div class="flex items-center justify-between mb-4">
                    <div id="badges" class="flex gap-2">
                        <div class="bg-purple-200 px-3 py-1 rounded-full text-sm">UI/UX</div>
                    </div>
                    <div id="actions" class="relative">
                        <button id="btn-actions" class="flex items-center p-1">
                            <i class="text-gray-500 ph ph-dots-three-outline-vertical"></i>
                        </button>
                        <div id="actions-dropdown"
                            class="absolute hidden bg-white border border-zinc-300 rounded right-0 text-sm text-zinc-500 py-1">
                            <div
                                class="cursor-pointer transition-colors hover:bg-gray-200 flex items-center gap-1 p-1">
                                <i class="ph ph-pencil-simple"></i> Editar
                            </div>
                            <div
                                class="cursor-pointer transition-colors hover:bg-red-500 hover:text-white flex items-center gap-1 p-1 text-red-500">
                                <i class="ph ph-trash-simple"></i> Deletar
                            </div>
                        </div>
                    </div>
                </div>
                <div id="progress-bar" class="h-1.5 bg-gray-200 rounded-full my-3">
                    <div id="progress" class="h-1.5 w-40 bg-green-400 rounded-full"></div>
                </div>
                <h1 class="font-medium mb-1">Título do card</h1>
                <p class="text-sm leading-tight">Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Facilis exercitationem, perspiciatis quod tempora sint voluptates veniam modi cum
                    adipisci laudantium.</p>
                <hr class="border-t-2 border-zinc-100 -mx-2 my-3">
                <div class="relative flex gap-1 justify-end text-gray-500">
                    <button id="btn-comment" class="flex items-center p-1">
                        <i class="ph ph-chat"></i>
                    </button>
                    <div id="comment-dropdown"
                        class="absolute hidden bottom-6 right-10 bg-white border border-zinc-300 rounded text-sm text-zinc-500 py-1">
                        <button class="transition-colors hover:bg-gray-200 flex items-center gap-1 p-1">
                            <i class="ph ph-plus-circle"></i> Adicionar comentário
                        </button>
                    </div>
                    <button id="btn-card-color" class="flex items-center p-1">
                        <i class="ph ph-palette"></i>
                    </button>
                    <div class="absolute bg-white border border-zinc-300 rounded w-28 p-2 hidden bottom-6"
                        id="colors-dropdown">
                        <div class="flex flex-wrap gap-2">
                            <button onclick="setCardBgColor(this)" value="#FECACA #FCA5A5"
                                class="transition-colors hover:bg-red-300 bg-red-200 border border-red-200 p-3 rounded">
                            </button>
                            <button onclick="setCardBgColor(this)" value="#BFDBFE #93C5FD"
                                class="transition-colors hover:bg-blue-300 bg-blue-200 border border-blue-200 p-3 rounded">
                            </button>
                            <button onclick="setCardBgColor(this)" value="#FEF08A #FDE047"
                                class="transition-colors hover:bg-yellow-300 bg-yellow-200 border border-yellow-200 p-3 rounded">
                            </button>
                            <button onclick="setCardBgColor(this)" value="#BBF7D0 #86EFAC"
                                class="transition-colors hover:bg-green-300 bg-green-200 border border-green-200 p-3 rounded">
                            </button>
                            <button onclick="setCardBgColor(this)" value="#FED7AA #FDBA74"
                                class="transition-colors hover:bg-orange-300 bg-orange-200 border border-orange-200 p-3 rounded">
                            </button>
                            <button onclick="setCardBgColor(this)" value="#E9D5FF #D8B4FE"
                                class="transition-colors hover:bg-purple-300 bg-purple-200 border border-purple-200 p-3 rounded">
                            </button>
                            <button onclick="setCardBgColor(this)" value="#FFFFFF #E5E7EB"
                                class="transition-colors hover:bg-gray-100 bg-white border border-gray-300 p-3 rounded">
                            </button>
                            <input type="color"
                                class="cursor-pointer size-[26px] rounded border border-gray-300"></input>
                        </div>
                    </div>
                    <div></div>
                </div>
            </div>
        `)
    })

    $('#create-project-form').on('submit', function(e) {
        e.preventDefault();

        const name = $('#name').val();
        const description = $('#description').val();

        // if (!name) {
        //     $('#name-error').removeClass('hidden');
        //     $('#name').addClass('border-red-500');
        //     return;
        // } else {
        //     $('#name-error').addClass('hidden');
        //     $('#name').removeClass('border-red-500');
        // }

        // if (!description) {
        //     $('#description-error').removeClass('hidden');
        //     $('#description').addClass('border-red-500');
        // } else {
        //     $('#description-error').addClass('hidden');
        //     $('#description').removeClass('border-red-500');
        // }

        $.ajax({
            method: "POST",
            data: {
                name,
                description
            },
            url: "/projects/save",
            success: function(data) {
                closeModal();

                Swal.fire({
                    title: 'Sucesso',
                    text: data,
                    icon: 'success',
                    confirmButtonText: 'Fechar'
                })
            },
            error: function(error) {
                Swal.fire({
                    title: "Erro",
                    text: "Erro ao criar projeto!",
                    icon: "error",
                    confirmButtonText: 'Fechar'
                })
                console.log(error);
            }
        });
    })

    $('#btn-fullscreen').on('click', function() {
        toggleFullScreen();
    })

    $('#btn-add-project').on('click', function() {
        $('#new-project-modal').toggle();
    })

    $('#btn-theme').on('click', function() {
        $('#theme-dropdown').toggle(200);
    })

    $('#btn-actions').on('click', function() {
        $('#actions-dropdown').toggle();
    })

    $('#btn-card-color').on('click', function() {
        $('#colors-dropdown').toggle();
    })

    $('#btn-comment').on('click', function() {
        $('#comment-dropdown').toggle();
    })

    function toggleFullScreen() {
        if (!document.fullscreenElement) {
            $('#btn-fullscreen i').addClass('ph-arrows-in').removeClass('ph-arrows-out');
            document.documentElement.requestFullscreen();
        } else if (document.exitFullscreen) {
            $('#btn-fullscreen i').addClass('ph-arrows-out').removeClass('ph-arrows-in');
            document.exitFullscreen();
        }
    }
</script>

</html>
