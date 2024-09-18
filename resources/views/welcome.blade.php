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
    <body class="h-screen font-suse bg-gray-200">
        <nav id="sidebar" class="fixed w-52 bg-red-500 h-full flex flex-col items-center">
            <h3 class="text-xl font-semibold">Projetos</h3>
            <div class="mt-6 rounded py-0.5 px-1 bg-white h-fit flex items-center">
                <input type="text">
                <button class="flex items-center p-0.5">
                    <i class="ph ph-magnifying-glass text-xl"></i>
                </button>
            </div>
            <div id="projects" class="mt-4 flex flex-col w-full px-2 gap-2">
                <div>
                    Projeto 1
                </div>
                <div>
                    Projeto 2
                </div>
                <div>
                    Projeto 3
                </div>
            </div>
        </nav>
        <nav id="topbar" class="fixed h-12 bg-red-200 flex justify-end px-4 py-7 gap-3 items-center left-52 right-0">
            <button id="btn-theme">
                <i class="ph ph-sun text-2xl"></i>
            </button>
            <button id="btn-fullscreen">
                <i class="ph ph-arrows-out text-2xl"></i>
            </button>
        </nav>
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
        <main class="flex flex-col items-center justify-center">
            <button class="px-3 py-1.5 bg-blue-300 text-white">Adicionar</button>
            <h1 class="text-3xl font-bold mb-4">
                Kanban
            </h1>

            <div class="flex gap-4">
                <div class="col-lg-3 h-100">
                    <header class="text-2xl font-bold">
                        A fazer
                    </header>
                    <div>
                        Card do kanban vem aqui
                    </div>
                </div>
                <div class="col-lg-3 h-100">
                    <header class="text-2xl font-bold">
                        Em progresso
                    </header>
                    <div>
                        Card do kanban vem aqui
                    </div>
                </div>
                <div class="col-lg-3 h-100">
                    <header class="text-2xl font-bold">
                        Testando
                    </header>
                    <div>
                        Card do kanban vem aqui
                    </div>
                </div>
                <div class="col-lg-3 h-100">
                    <header class="text-2xl font-bold">
                        Implementado
                    </header>
                    <div>
                        Card do kanban vem aqui
                    </div>
                </div>
            </div>
        </main>
    </body>

    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    <script>
        $('#btn-fullscreen').on('click', function () {
            toggleFullScreen();
        })

        $('#btn-theme').on('click', function () {
            $('#theme-dropdown').toggle(200);
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
