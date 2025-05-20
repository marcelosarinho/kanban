<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="author" content="Marcelo Sarinho">
    <meta name="description" content="Web application created to manage my programming projects">
    @vite('resources/css/app.css')

    <title>Kanban</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=SUSE:wght@100..800&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/@phosphor-icons/web"></script>
</head>

<body class="absolute h-screen font-suse bg-neutral-100 dark:bg-slate-950">
    <aside id="leftbar" class="fixed w-52 bg-white h-full border-r border-gray-300 dark:bg-slate-900 dark:border-slate-700">
        <div id="sidebar" class="flex flex-col items-center px-2">
            <h3 class="text-xl font-semibold text-center mb-4 mt-2 dark:text-gray-300">Projetos</h3>
            <x-button id="btn-add-project" type="button" bgColor="bg-primary" textColor="text-white">
                <i class="ph-bold ph-plus text-lg"></i>
                Adicionar projeto
            </x-button>

            <div
                class="mt-6 rounded py-0.5 px-1 bg-gray-50 h-fit flex items-center border
                dark:bg-slate-800 dark:border-slate-700"
            >
                <input type="text" class="outline-none px-0.5 text-sm bg-gray-50
                    dark:bg-slate-800 dark:text-gray-300">
                <button class="flex items-center p-0.5">
                    <i class="ph ph-magnifying-glass text-xl dark:text-gray-300"></i>
                </button>
            </div>
            <div id="div-projects" class="mt-4 flex flex-col w-full gap-3"></div>
        </div>
    </aside>
    <section id="rightbar" class="ml-52">
        <nav id="topbar"
            class="z-[1] fixed h-12 bg-white flex justify-end px-4 py-7 gap-3 items-center left-52 right-0 border-b border-gray-300
            dark:bg-slate-900 dark:border-slate-700"
        >
            <button id="btn-theme">
                <i class="ph ph-sun text-2xl dark:text-gray-300"></i>
            </button>
            <button id="btn-fullscreen">
                <i class="ph ph-arrows-out text-2xl dark:text-gray-300"></i>
            </button>
            <div id="theme-dropdown" class="absolute right-12 top-10 bg-white rounded-md mt-2 p-2 w-28 hidden text-sm border
                border-gray-300 dark:bg-slate-900 dark:border-slate-700 dark:text-gray-300">
                <div id="dark-theme" class="rounded px-2 py-1 flex items-center hover:bg-gray-100 cursor-pointer dark:hover:bg-slate-800">
                    <i class="mr-2 ph ph-moon text-xl"></i>
                    Escuro
                </div>
                <div id="light-theme" class="rounded px-2 py-1 flex items-center hover:bg-gray-100 cursor-pointer dark:hover:bg-slate-800">
                    <i class="mr-2 ph ph-sun text-xl"></i>
                    Claro
                </div>
                <div id="system-theme" class="rounded px-2 py-1 flex items-center hover:bg-gray-100 cursor-pointer dark:hover:bg-slate-800">
                    <i class="mr-2 ph ph-moon-stars text-xl"></i>
                    Sistema
                </div>
            </div>
        </nav>

        <main class="flex flex-col items-center justify-center px-6 pt-20 dark:bg-slate-950 bg-gray-50 h-screen max-h-screen">
            <h1 id="kanban-title" class="text-3xl font-bold mb-4 dark:text-gray-300">
                Kanban
            </h1>

            <p id="kanban-description" class="text-sm text-gray-500 dark:text-gray-400">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis, et.</p>

            <div class="flex justify-between w-full mb-4">
                <x-button id="btn-add-task" type="button" bgColor="bg-primary" textColor="text-white">
                    <i class="ph-bold ph-plus text-lg"></i>
                    Adicionar tarefa
                </x-button>
    
                <x-button id="add-task" type="button" bgColor="bg-success" textColor="text-dark">
                    <i class="ph-bold ph-check text-lg"></i>
                    Salvar
                </x-button>
            </div>

            <div class="flex gap-4">
                <div id="to-do-section" class="col-lg-3 h-100">
                    <header class="text-2xl font-bold mb-2 dark:text-gray-300">
                        A fazer
                    </header>
                    <div class="p-3 h-96 w-72 rounded border border-gray-300 bg-white dark:bg-slate-900 dark:border-slate-700"></div>
                </div>
                <div id="in-progress-section" class="col-lg-3 h-100">
                    <header class="text-2xl font-bold mb-2 dark:text-gray-300">
                        Em progresso
                    </header>
                    <div class="h-96 w-72 rounded border border-gray-300 bg-white dark:bg-slate-900 dark:border-slate-700">
                        <div></div>
                    </div>
                </div>
                <div id="testing-section" class="col-lg-3 h-100">
                    <header class="text-2xl font-bold mb-2 dark:text-gray-300">
                        Testando
                    </header>
                    <div class="h-96 w-72 rounded border border-gray-300 bg-white dark:bg-slate-900 dark:border-slate-700">
                        <div></div>
                    </div>
                </div>
                <div id="implement-section" class="col-lg-3 h-100">
                    <header class="text-2xl font-bold mb-2 dark:text-gray-300">
                        Implementado
                    </header>
                    <div class="h-96 w-72 rounded border border-gray-300 bg-white dark:bg-slate-900 dark:border-slate-700">
                        <div></div>
                    </div>
                </div>
            </div>
        </main>
    </section>

    <x-success-modal />
    <x-error-modal />

    <x-modal id="new-project-modal" closeModal="closeModal('new-project-modal')">
        <x-slot:header>
            Novo projeto
        </x-slot:header>

        <form id="create-project-form">
            @csrf
            <div class="mb-3">
                <x-label for="name">Nome</x-label>
                <x-text-input name="name" id="name" />
                <p id="name-error" class="text-red-500 text-sm mt-1 hidden"></p>
            </div>

            <div class="mb-3">
                <x-label for="description">Descrição</x-label>
                <textarea name="description" id="description" cols="30" rows="3"
                    class="px-2 py-1.5 border border-gray-300 rounded w-full dark:bg-slate-800 dark:border-slate-950 focus-visible:ring-4
                    focus-visible:ring-primary/40 focus-visible:outline-none focus-visible:border focus-visible:border-primary
                    dark:text-gray-300"
                ></textarea>
                <p id="description-error" class="text-red-500 text-sm mt-1 hidden"></p>
            </div>
        </form>

        <x-slot:footer>
            <x-button id="btn-close-modal" type="button" bgColor="bg-transparent" textColor="text-primary" border="border" borderColor="border-primary"
                onclick="closeModal('new-project-modal')">
                <i class="ph-bold ph-x text-lg"></i>
                Cancelar
            </x-button>

            <x-button id="btn-create-new-project" type="submit" bgColor="bg-primary" textColor="text-white" form="create-project-form">
                <i class="ph-bold ph-plus text-lg"></i>
                Criar
            </x-button>
        </x-slot:footer>
    </x-modal>

    <x-modal id="delete-project-modal" closeModal="closeModal('delete-project-modal')">
        <x-slot:header>Deletar projeto <span id="delete-project-name"></span>?</x-slot:header>

        <form id="delete-project-form">
            <p>Tem certeza de que deseja executar essa ação? O projeto será deletado para sempre!</p>
            <input type="hidden" name="project_id" id="project_id">
        </form>

        <x-slot:footer>
            <x-button id="btn-close-delete-project-modal" type="button" bgColor="bg-transparent" textColor="text-primary" border="border" borderColor="border-primary"
                onclick="closeModal('delete-project-modal')"
            >
                <i class="ph-bold ph-x text-lg"></i>
                Cancelar
            </x-button>
            <x-button id="btn-delete-project" type="submit" bgColor="bg-primary" textColor="text-white" form="delete-project-form">
                <i class="ph ph-trash"></i>
                Deletar
            </x-button>
        </x-slot:footer>
    </x-modal>

    <x-modal id="new-task-modal" closeModal="closeModal('new-task-modal')">
        <x-slot:header>
            Nova tarefa
        </x-slot:header>

        <form id="create-task-form">
            @csrf
            <div class="mb-3">
                <x-label for="task_name">Nome da tarefa</x-label>
                <x-text-input name="task_name" id="task_name" />
                <p id="task_name-error" class="text-red-500 text-sm mt-1 hidden"></p>
            </div>

            <div class="mb-3">
                <x-label for="task-description">Descrição</x-label>
                <textarea name="task-description" id="task-description" cols="30" rows="3"
                    class="px-2 py-1.5 border border-gray-300 rounded w-full dark:bg-slate-800 dark:border-slate-950 focus-visible:ring-4
                    focus-visible:ring-primary/40 focus-visible:outline-none focus-visible:border focus-visible:border-primary
                    dark:text-gray-300"
                ></textarea>
                <p id="task-description-error" class="text-red-500 text-sm mt-1 hidden"></p>
            </div>

            <div class="mb-3">
                <x-label for="priority">Prioridade</x-label>
                <select name="priority" id="priority" class="px-2 py-1.5 border border-gray-300 rounded w-full dark:bg-slate-800 dark:border-slate-950 focus-visible:ring-4
                    focus-visible:ring-primary/40 focus-visible:outline-none focus-visible:border focus-visible:border-primary
                    dark:text-gray-300">
                    <option disabled selected value="">Selecione uma prioridade</option>
                    <option value="high">Alta</option>
                    <option value="medium">Média</option>
                    <option value="low">Baixa</option>
                </select>
                <p id="priority-error" class="text-red-500 text-sm mt-1 hidden"></p>
            </div>

            <div class="mb-3">
                <x-label for="category">Categoria(s)</x-label>
                <div class="flex gap-3">
                    <label class="dark:bg-slate-800 dark:border-slate-950 dark:text-gray-300 dark:hover:bg-purple-900/30 dark:hover:text-purple-300 dark:hover:border-purple-700 has-[:disabled]:opacity-50 has-[:checked]:text-purple-700 has-[:checked]:bg-purple-100 has-[:checked]:border-purple-300 hover:bg-purple-100
                        hover:border-purple-300 hover:text-purple-700 border-[1.5px] transition-colors border-gray-300 rounded-full py-1 px-2 cursor-pointer"
                    >
                        <input class="hidden category-input" type="checkbox" name="category" id="teste">
                        UI/UX
                    </label>
                    <label class="dark:bg-slate-800 dark:border-slate-950 dark:text-gray-300 dark:hover:bg-blue-900/30 dark:hover:text-blue-300 dark:hover:border-blue-700 has-[:disabled]:opacity-50 has-[:checked]:text-blue-700 has-[:checked]:bg-blue-100 has-[:checked]:border-blue-300 hover:bg-blue-100
                        hover:border-blue-300 hover:text-blue-700 transition-colors border-[1.5px] border-gray-300 rounded-full py-1 px-2 cursor-pointer"
                    >
                        <input class="hidden category-input" type="checkbox" name="category" id="frontend">
                        Front-end
                    </label>
                    <label class="dark:bg-slate-800 dark:border-slate-950 dark:text-gray-300 dark:hover:bg-green-900/30 dark:hover:text-green-300 dark:hover:border-green-700 has-[:disabled]:opacity-50 has-[:checked]:text-green-700 has-[:checked]:bg-green-100 has-[:checked]:border-green-300 hover:bg-green-100
                        hover:border-green-300 hover:text-green-700 transition-colors border-[1.5px] border-gray-300 rounded-full py-1 px-2 cursor-pointer"
                    >
                        <input class="hidden category-input" type="checkbox" name="category" id="backend">
                        Back-end
                    </label>
                    <label class="dark:bg-slate-800 dark:border-slate-950 dark:text-gray-300 dark:hover:bg-orange-900/30 dark:hover:text-orange-300 dark:hover:border-orange-700 has-[:disabled]:opacity-50 has-[:checked]:text-orange-700 has-[:checked]:bg-orange-100 has-[:checked]:border-orange-300 hover:bg-orange-100
                        hover:border-orange-300 hover:text-orange-700 transition-colors border-[1.5px] border-gray-300 rounded-full py-1 px-2 cursor-pointer"
                    >
                        <input class="hidden category-input" type="checkbox" name="category" id="database">
                        Banco de dados
                    </label>
                    <label class="dark:bg-slate-800 dark:border-slate-950 dark:text-gray-300 dark:hover:bg-pink-900/30 dark:hover:text-pink-300 dark:hover:border-pink-700 has-[:disabled]:opacity-50 has-[:checked]:text-pink-700 has-[:checked]:bg-pink-100 has-[:checked]:border-pink-300 hover:bg-pink-100
                        hover:border-pink-300 hover:text-pink-700 transition-colors border-[1.5px] border-gray-300 rounded-full py-1 px-2 cursor-pointer"
                    >
                        <input class="hidden category-input" type="checkbox" name="category" id="devops">
                        DevOps
                    </label>
                    <label class="dark:bg-slate-800 dark:border-slate-950 dark:text-gray-300 dark:hover:bg-red-900/30 dark:hover:text-red-300 dark:hover:border-red-700 has-[:disabled]:opacity-50 has-[:checked]:text-red-700 has-[:checked]:bg-red-100 has-[:checked]:border-red-300 hover:bg-red-100
                        hover:border-red-300 hover:text-red-700 transition-colors border-[1.5px] border-gray-300 rounded-full py-1 px-2 cursor-pointer"
                    >
                        <input class="hidden category-input" type="checkbox" name="category" id="mobile">
                        Mobile
                    </label>
                </div>
                <p id="category-error" class="text-red-500 text-sm mt-1 hidden"></p>
            </div>

            <div class="mb-3">
                <x-label for="column_id">Coluna</x-label>
                <select name="column_id" id="column_id" class="px-2 py-1.5 border border-gray-300 rounded w-full dark:bg-slate-800 dark:border-slate-950 focus-visible:ring-4
                    focus-visible:ring-primary/40 focus-visible:outline-none focus-visible:border focus-visible:border-primary
                    dark:text-gray-300">
                    <option disabled selected value="">Selecione uma coluna</option>
                    <option value="todo">A fazer</option>
                    <option value="in_progress">Em progresso</option>
                    <option value="testing">Testando</option>
                    <option value="implemented">Implementado</option>
                </select>
                <p id="column_id-error" class="text-red-500 text-sm mt-1 hidden"></p>
            </div>
        </form>

        <x-slot:footer>
            <x-button id="btn-close-modal" type="button" bgColor="bg-transparent" textColor="text-primary" border="border" borderColor="border-primary"
                onclick="closeModal('new-task-modal')">
                <i class="ph-bold ph-x text-lg"></i>
                Cancelar
            </x-button>

            <x-button id="btn-create-new-task" type="submit" bgColor="bg-primary" textColor="text-white" form="create-task-form">
                <i class="ph-bold ph-plus text-lg"></i>
                Criar
            </x-button>
        </x-slot:footer>
    </x-modal>
</body>

<script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
<script>
    const PROJECTS = {{ Js::from($projects) }}

    $(document).ready(function() {
        loadProjects();
        loadTheme();
        loadSelectedProject();
    })

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    function loadProjects() {
        PROJECTS.forEach((project) => {
            $('#div-projects').prepend(`
                <x-sidebar-card
                    id="${project.id}"
                    openProject="openProject(${project.id})"
                    openModal="openDeleteProjectModal(${project.id}, '${project.name}')"
                    name="${project.name}"
                    description="${project.description}"
                />
            `)
        })
    }

    function loadTheme() {
        const theme = localStorage.getItem('theme');

        if (theme === 'dark') {
            $('html').addClass('dark');
        } else {
            $('html').removeClass('light');
        }
    }

    function loadSelectedProject() {
        const project = localStorage.getItem('project');

        if (project) {
            openProject(project);
        }
    }

    function openProject(id) {
        $.ajax({
            method: 'GET',
            url: `/projects/${id}`,
            success: function(response) {
                $('#kanban-title').text(response.name);
                $('#kanban-description').text(response.description);
                localStorage.setItem('project', response.id);
            },
            error: function(error) {
                console.error(error);
            },
        })
    }

    function openDeleteProjectModal(id, name) {
        $('#delete-project-name').text(name);
        $('#delete-project-modal').toggle();
        $('#project_id').val(id);
    }

    function clearErrors() {
        const fields = ['name', 'description'];

        fields.forEach((field) => {
            $(`#${field}-error`).addClass('hidden');
            $(`#${field}-error`).text('');
            $(`#${field}`).addClass('border-gray-300');
            $(`#${field}`).addClass('dark:border-slate-950');
            $(`#${field}`).removeClass('border-red-500');
        })
    }

    function renderErrors(errors) {
        for(const field in errors) {
            if (Object.hasOwn(errors, field)) {
                $(`#${field}-error`).removeClass('hidden');
                $(`#${field}-error`).text(errors[field]);
                $(`#${field}`).removeClass('border-gray-300');
                $(`#${field}`).removeClass('dark:border-slate-950');
                $(`#${field}`).addClass('border-red-500');
            }
        }
    }

    function setCardBgColor(element) {
        let colors = element.value.split(" ");
        $('#card-inicial').css('background-color', colors[0]);
        $('#card-inicial').css('border-color', colors[1]);
        $('hr').css('border-color', colors[1]);
    }

    function closeModal(id) {
        $(`#${id}`).toggle();
    }

    function closeErrorModal() {
        $('#error-modal').toggle();
    }

    function closeSuccessModal() {
        $('#success-modal').toggle();
        window.location.reload();
    }

    function showSuccess(text) {
        $('#success-modal main').text(text);
        $('#success-modal').fadeToggle(200);
    }

    function showError(error) {
        $('#error-modal main').text(error);
        $('#error-modal').toggle();
    }

    $('#dark-theme').on('click', function () {
        $('html').addClass('dark');
        localStorage.setItem('theme', 'dark');
    })

    $('#light-theme').on('click', function () {
        $('html').removeClass('dark');
        localStorage.setItem('theme', 'light');
    })

    $('#btn-add-card').on('click', function () {
        $('#to-do-section > div').append(`
            <div id="card-inicial" class="bg-gray-100 rounded-md border-2 border-gray-300 px-2 py-3 dark:bg-slate-800 dark:border-slate-700 dark:text-gray-300">
                <div class="flex items-center justify-between mb-4">
                    <div id="badges" class="flex gap-2">
                        <div class="bg-purple-200 dark:bg-purple-800 px-3 py-1 rounded-full text-sm">UI/UX</div>
                    </div>
                    <div id="actions" class="relative">
                        <button id="btn-actions" class="flex items-center p-1">
                            <i class="ph ph-dots-three-outline-vertical text-white dark:text-gray-300"></i>
                        </button>
                        <div id="actions-dropdown"
                            class="absolute hidden bg-white border border-zinc-300 rounded right-0 text-sm py-1 text-black dark:text-gray-300">
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
                <div id="progress-bar" class="h-1.5 bg-gray-400 dark:bg-slate-900 rounded-full my-3">
                    <div id="progress" class="h-1.5 w-40 bg-green-400 rounded-full"></div>
                </div>
                <h1 class="font-medium mb-1">Título do card</h1>
                <p class="text-sm leading-tight">Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Facilis exercitationem, perspiciatis quod tempora sint voluptates veniam modi cum
                    adipisci laudantium.</p>
                <hr class="border-t-2 border-gray-300 dark:border-slate-700 -mx-2 my-3">
                <div class="relative flex gap-1 justify-end text-gray-500">
                    <button id="btn-comment" class="flex items-center p-1">
                        <i class="ph ph-chat text-dark dark:text-gray-300"></i>
                    </button>
                    <div id="comment-dropdown"
                        class="absolute hidden bottom-6 right-10 bg-white border border-zinc-300 rounded text-sm text-zinc-500 py-1">
                        <button class="transition-colors hover:bg-gray-200 flex items-center gap-1 p-1">
                            <i class="ph ph-plus-circle"></i> Adicionar comentário
                        </button>
                    </div>
                    <button id="btn-card-color" class="flex items-center p-1">
                        <i class="ph ph-palette text-dark dark:text-gray-300"></i>
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

        clearErrors();

        $.ajax({
            method: "POST",
            data: {
                name,
                description
            },
            url: "/projects/save",
            success: function(response) {
                closeModal('new-project-modal');
                showSuccess(response);
            },
            error: function(error) {
                showError(error);
                renderErrors(error.responseJSON.errors)
            }
        });
    })

    $('#btn-fullscreen').on('click', function() {
        toggleFullScreen();
    })

    $('#btn-add-project').on('click', function() {
        $('#new-project-modal').toggle();
    })

    $('#btn-add-task').on('click', function() {
        $('#new-task-modal').toggle();
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

    $('#delete-project-form').on('submit', function(e) {
        e.preventDefault();

        const project_id = $('#project_id').val() ? $('#project_id').val() : null;

        $.ajax({
            method: 'DELETE',
            url: `/projects/${project_id}`,
            success: function(response) {
                closeModal('delete-project-modal');
                showSuccess(response);
            },
            error: function(error) {
                showError(error);
                console.log(error);
            }
        })
    })

    $('.category-input').on('change', function() {
        const selectedCategoriesLength = $('.category-input:checked').length;
        
        if (selectedCategoriesLength >= 2) {
            $('.category-input:not(:checked)').prop('disabled', true);
        } else {
            $('.category-input').prop('disabled', false);
        }
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
