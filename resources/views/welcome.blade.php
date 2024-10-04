<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
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
        <aside id="leftbar" class="fixed w-52 bg-primary-300 h-full">
            <div id="sidebar" class="flex flex-col items-center px-2">
                <h3 class="text-xl font-semibold text-center">Projetos</h3>
                <button type="button" class="bg-blue-500 px-2 py-1.5 rounded text-white text-sm mt-3">
                    Adicionar projeto
                </button>
                <div class="mt-6 rounded py-0.5 px-1 bg-white h-fit flex items-center focus-within:border-primary-700 border-2">
                    <input type="text" class="outline-none px-0.5 text-sm">
                    <button class="flex items-center p-0.5">
                        <i class="ph ph-magnifying-glass text-xl"></i>
                    </button>
                </div>
                <div id="projects" class="mt-4 flex flex-col w-full gap-3">
                    <div class="bg-primary-200 py-2 px-3 rounded cursor-pointer">
                        <h2 class="font-semibold">Projeto 1</h2>
                        <h6 class="text-sm truncate leading-tight">Descrição dasdas jdashh sa hadsh dhas dhashd sahd ashdsah</h6>
                    </div>
                    <div class="bg-primary-200 py-2 px-3 rounded cursor-pointer">
                        <h2 class="font-semibold">Projeto 2</h2>
                        <h6 class="text-sm truncate leading-tight">Descrição dasdas jdashh sa hadsh dhas dhashd sahd ashdsah</h6>
                    </div>
                    <div class="bg-primary-200 py-2 px-3 rounded cursor-pointer">
                        <h2 class="font-semibold">Projeto 3</h2>
                        <h6 class="text-sm truncate leading-tight">Descrição dasdas jdashh sa hadsh dhas dhashd sahd ashdsah</h6>
                    </div>
                </div>
            </div>
        </aside>
        <section id="rightbar" class="ml-52">
            <nav id="topbar" class="z-[1] fixed h-12 bg-white flex justify-end px-4 py-7 gap-3 items-center left-52 right-0">
                <button id="btn-theme">
                    <i class="ph ph-sun text-2xl"></i>
                </button>
                <button id="btn-fullscreen">
                    <i class="ph ph-arrows-out text-2xl"></i>
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

            <main class="flex flex-col items-center justify-center pt-20">
                <button class="px-3 py-1.5 bg-blue-300 text-white">Adicionar</button>
                <h1 class="text-3xl font-bold mb-4">
                    Kanban
                </h1>
    
                <div class="flex gap-4">
                    <div class="col-lg-3 h-100">
                        <header class="text-2xl font-bold mb-2">
                            A fazer
                        </header>
                        <div class="p-3 h-96 w-72 bg-green-200">
                            <div id="card-inicial" class="bg-white rounded-md border-2 px-2 py-3">
                                <div class="flex items-center justify-between mb-4">
                                    <div id="badges" class="flex gap-2">
                                        <div class="bg-purple-200 px-3 py-1 rounded-full text-sm">UI/UX</div>
                                    </div>
                                    <div id="actions" class="relative">
                                        <button id="btn-actions" class="flex items-center p-1">
                                            <i class="text-gray-500 ph ph-dots-three-outline-vertical"></i>
                                        </button>
                                        <div id="actions-dropdown" class="absolute hidden bg-white border border-zinc-300 rounded right-0 text-sm text-zinc-500 py-1">
                                            <div class="cursor-pointer transition-colors hover:bg-gray-200 flex items-center gap-1 p-1">
                                                <i class="ph ph-pencil-simple"></i> Editar
                                            </div>
                                            <div class="cursor-pointer transition-colors hover:bg-red-500 hover:text-white flex items-center gap-1 p-1 text-red-500">
                                                <i class="ph ph-trash-simple"></i> Deletar
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="progress-bar" class="h-1.5 bg-gray-200 rounded-full my-3">
                                    <div id="progress" class="h-1.5 w-40 bg-green-400 rounded-full"></div>
                                </div>
                                <h1 class="font-medium mb-1">Título do card</h1>
                                <p class="text-sm leading-tight">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis exercitationem, perspiciatis quod tempora sint voluptates veniam modi cum adipisci laudantium.</p>
                                <hr class="border-t-2 border-zinc-100 -mx-2 my-3">
                                <div class="relative flex gap-1 justify-end text-gray-500">
                                    <button id="btn-comment" class="flex items-center p-1">
                                        <i class="ph ph-chat"></i>
                                    </button>
                                    <div id="comment-dropdown" class="absolute hidden bottom-6 right-10 bg-white border border-zinc-300 rounded text-sm text-zinc-500 py-1">
                                        <button class="transition-colors hover:bg-gray-200 flex items-center gap-1 p-1">
                                            <i class="ph ph-plus-circle"></i> Adicionar comentário
                                        </button>
                                    </div>
                                    <button id="btn-card-color" class="flex items-center p-1">
                                        <i class="ph ph-palette"></i>
                                    </button>
                                    <div class="absolute bg-white border border-zinc-300 rounded w-28 p-2 hidden bottom-6" id="colors-dropdown">
                                        <div class="flex flex-wrap gap-2">
                                            <button
                                                onclick="setCardBgColor(this)"
                                                value="#FECACA #FCA5A5"
                                                class="transition-colors hover:bg-red-300 bg-red-200 border border-red-200 p-3 rounded">
                                            </button>
                                            <button
                                                onclick="setCardBgColor(this)"
                                                value="#BFDBFE #93C5FD"
                                                class="transition-colors hover:bg-blue-300 bg-blue-200 border border-blue-200 p-3 rounded">
                                            </button>
                                            <button
                                                onclick="setCardBgColor(this)"
                                                value="#FEF08A #FDE047"
                                                class="transition-colors hover:bg-yellow-300 bg-yellow-200 border border-yellow-200 p-3 rounded">
                                            </button>
                                            <button
                                                onclick="setCardBgColor(this)"
                                                value="#BBF7D0 #86EFAC"
                                                class="transition-colors hover:bg-green-300 bg-green-200 border border-green-200 p-3 rounded">
                                            </button>
                                            <button
                                                onclick="setCardBgColor(this)"
                                                value="#FED7AA #FDBA74"
                                                class="transition-colors hover:bg-orange-300 bg-orange-200 border border-orange-200 p-3 rounded">
                                            </button>
                                            <button
                                                onclick="setCardBgColor(this)"
                                                value="#E9D5FF #D8B4FE"
                                                class="transition-colors hover:bg-purple-300 bg-purple-200 border border-purple-200 p-3 rounded">
                                            </button>
                                            <button
                                                onclick="setCardBgColor(this)"
                                                value="#FFFFFF #E5E7EB"
                                                class="transition-colors hover:bg-gray-100 bg-white border border-gray-300 p-3 rounded">
                                            </button>
                                            <input type="color"
                                            class="cursor-pointer size-[26px] rounded border border-gray-300"></input>
                                        </div>
                                    </div>
                                    <div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 h-100">
                        <header class="text-2xl font-bold mb-2">
                            Em progresso
                        </header>
                        <div class="h-96 w-72 bg-green-200">
                            <div>Card 1</div>
                        </div>
                    </div>
                    <div class="col-lg-3 h-100">
                        <header class="text-2xl font-bold mb-2">
                            Testando
                        </header>
                        <div class="h-96 w-72 bg-green-200">
                            <div>Card 1</div>
                        </div>
                    </div>
                    <div class="col-lg-3 h-100">
                        <header class="text-2xl font-bold mb-2">
                            Implementado
                        </header>
                        <div class="h-96 w-72 bg-green-200">
                            <div>Card 1</div>
                        </div>
                    </div>
                </div>
            </main>
        </section>
    </body>

    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    <script>
        function setCardBgColor(element) {
            let colors = element.value.split(" ");
            $('#card-inicial').css('background-color', colors[0]);
            $('#card-inicial').css('border-color', colors[1]);
            $('hr').css('border-color', colors[1]);
        }

        $('#btn-fullscreen').on('click', function () {
            toggleFullScreen();
        })

        $('#btn-theme').on('click', function () {
            $('#theme-dropdown').toggle(200);
        })

        $('#btn-actions').on('click', function () {
            $('#actions-dropdown').toggle();
        })

        $('#btn-card-color').on('click', function () {
            $('#colors-dropdown').toggle();
        })

        $('#btn-comment').on('click', function () {
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
