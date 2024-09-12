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
    <body class="h-screen font-suse flex flex-col items-center justify-center">
        <h1 class="text-3xl font-bold mb-4">
            Kanban
        </h1>

        <main class="flex gap-4">
            <div class="col-lg-3 h-100">
                <header>
                    Coluna 1
                </header>
                <div>
                    Card do kanban vem aqui
                </div>
            </div>
            <div class="col-lg-3 h-100">
                <header>
                    Coluna 2
                </header>
                <div>
                    Card do kanban vem aqui
                </div>
            </div>
            <div class="col-lg-3 h-100">
                <header>
                    Coluna 3
                </header>
                <div>
                    Card do kanban vem aqui
                </div>
            </div>
            <div class="col-lg-3 h-100">
                <header>
                    Coluna 4
                </header>
                <div>
                    Card do kanban vem aqui
                </div>
            </div>
        </main>
    </body>

    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    <script>
        $(document).ready(function () {
            console.log("jquery instalado");
        })
    </script>
</html>
