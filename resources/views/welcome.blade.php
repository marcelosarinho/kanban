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
    </head>
    <body class="h-screen font-suse bg-gray-500">
        <nav class="h-12 bg-red-200">
            <button id="btn-theme">Dark mode</button>
            <button id="btn-fullscreen">Fullscreen</button>
        </nav>
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
            console.log("modo dark");
        })

        function toggleFullScreen() {
            const bodyElement = document.querySelector('body');

            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
            } else if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    </script>
</html>
