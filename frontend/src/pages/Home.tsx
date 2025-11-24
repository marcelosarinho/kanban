import TaskCategoryBadge from "@components/badge/TaskCategoryBadge";
import TaskPriorityBadge from "@components/badge/TaskPriorityBadge";
import ThemeButton from "@components/theme/ThemeButton";
import ThemeIcon from "@components/theme/ThemeIcon";
import { useTheme } from "@contexts/ThemeContext";
import type { ThemeOption } from "@custom-types/constants";
import { THEME_NAMES } from "@libs/constants";
import { ArrowRightIcon, CodeIcon, FolderIcon, GithubLogoIcon, KanbanIcon, LightningIcon, LinkedinLogoIcon, ListIcon, XIcon } from "@phosphor-icons/react";
import { useRef } from "react";
import { Link } from "react-router";



export default function Home() {
  const { theme, changeTheme } = useTheme();

  const sidebar = useRef<HTMLDivElement>(null);

  function openSidebar() {
    if (!sidebar.current) {
      return;
    }

    sidebar.current.classList.add("fixed", "animate-slide-in-from-right");
    sidebar.current.classList.remove("hidden");
  }

  function closeSidebar() {
    if (!sidebar.current) {
      return;
    }

    sidebar.current.classList.remove("fixed", "animate-slide-in-from-right");
    sidebar.current.classList.add("hidden");
  }

  function redirectTo(id: string) {
    closeSidebar();

    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <main>
      <nav className="fixed top-2 w-full bg-transparent z-50">
        <div className="px-6">
          <div className="bg-white dark:bg-slate-950 flex items-center justify-between border border-gray-200 p-3 rounded-lg dark:border-slate-800 shadow-sm">
            <KanbanIcon className="inline-block text-3xl dark:text-gray-200" />

            <div className="md:flex items-center gap-3 dark:text-gray-200 hidden">
              <a href="#features" className="hidden sm:inline-block hover:bg-neutral-200 dark:hover:bg-slate-700 px-2 py-1 rounded dark:hover:text-white transition-colors">
                Funcionalidades
              </a>

              <a href="#how-it-works" className="hidden sm:inline-block hover:bg-neutral-200 dark:hover:bg-slate-700 px-2 py-1 rounded dark:hover:text-white transition-colors">
                Como funciona?
              </a>

              <Link
                to="/auth/login"
                className="inline-block rounded border border-neutral-300 hover:border-neutral-400 dark:border-slate-600 px-2 py-1 dark:hover:border-slate-500 transition-colors dark:hover:text-white">
                  Fazer login
              </Link>

              <Link
                to="/auth/sign-up"
                className="inline-block rounded border border-primary bg-primary hover:border-primary/25 px-2 py-1 transition-colors"
              >
                Cadastre-se
              </Link>

              <div className="h-7 w-px bg-gray-200 dark:bg-slate-800"></div>

              <ThemeButton dropdownClassName="right-10 top-10" />
            </div>

            <div className="md:hidden">
              <button
                onClick={openSidebar}
                className="dark:text-white border p-1 rounded border-neutral-300 hover:border-neutral-400 dark:border-slate-600"
              >
                <ListIcon weight="bold" className="text-lg"/>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div ref={sidebar} className="hidden w-full h-full bg-neutral-50 dark:bg-slate-900 z-[60] p-3">
        <XIcon weight="bold" className="dark:text-gray-200 text-xl" onClick={closeSidebar}/>

        <div className="my-4 flex flex-col gap-3 dark:text-gray-200 text-center">
          <Link to="/auth/login" className="block bg-white rounded border border-neutral-300 hover:border-neutral-400 dark:border-slate-600 px-2 py-1 dark:hover:border-slate-500 transition-colors dark:hover:text-white dark:bg-slate-950">Fazer login</Link>
          <Link to="/auth/sign-up" className="block bg-primary rounded border text-white border-primary hover:border-primary/25 px-2 py-1 transition-colors">Cadastre-se</Link>
        </div>

        <a onClick={() => redirectTo("features")} className="p-2 block dark:text-gray-200">Funcionalidades</a>
        <a onClick={() => redirectTo("how-it-works")} className="p-2 block dark:text-gray-200">Como funciona?</a>

        <hr className="my-4 dark:border-slate-700 border-neutral-300" />

        <div className="flex items-center justify-between">
          <span className="dark:text-gray-200">Tema</span>

          <div className="relative flex items-center justify-between gap-2 border border-neutral-300 rounded px-2 py-1 dark:border-slate-600 dark:bg-slate-900 dark:text-gray-200 bg-white">
            <ThemeIcon theme={theme} />

            <span>{THEME_NAMES[theme]}</span>

            <select
              onChange={(e) => changeTheme(e.target.value as ThemeOption)}
              className="absolute size-full appearance-none border border-red-500 inset-0 opacity-0"
              value={theme}
            >
              <option value="dark">Escuro</option>
              <option value="light">Claro</option>
              <option value="system">Sistema</option>
            </select>
          </div>
        </div>
      </div>

      <section className="py-36 mx-6 text-center">
        <h1 className="text-5xl font-bold mb-6 dark:text-gray-200">Organize seus projetos. <span className="text-primary">Visualize progreso.</span></h1>
        <p className="text-xl text-gray-600 mb-6 dark:text-gray-500">Um quadro kanban simples e eficiente para ajudar você a gerenciar seus projetos pessoais de programação.</p>
        <div className="flex justify-center gap-3">
          <Link
            to="/auth/sign-up"
            className="text-xl inline-flex items-center gap-2 rounded dark:border-slate-600 px-3 py-2 dark:hover:border-slate-500 transition-colors bg-primary/15 hover:bg-primary/25 text-primary dark:bg-primary/30 dark:hover:bg-primary/40"
            >
            Comece agora
            <ArrowRightIcon weight="bold"/>
          </Link>

          <Link
            to="/auth/login"
            className="text-xl inline-flex items-center gap-2 rounded border bg-white border-neutral-300 hover:border-neutral-400 dark:border-slate-600 px-3 py-2 dark:hover:border-slate-500 transition-colors dark:bg-slate-900 dark:text-gray-200"
            >
            Faça login
          </Link>
        </div>
      </section>

      <section id="features" className="pb-36 mx-6 text-center">
        <h2 className="text-4xl font-bold mb-3 dark:text-gray-200">Tudo o que você precisa</h2>
        <p className="text-xl text-gray-600 mb-16 dark:text-gray-500">Ferramentas que auxiliam você a se manter organizado e produtivo</p>
        <div className="container grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto">
          <div className="p-4 flex flex-col size-fit gap-6 text-left border border-gray-300 rounded-xl bg-neutral-50 dark:border-slate-600 dark:bg-slate-900 h-auto">
            <div className="bg-primary/20 w-fit p-1.5 rounded">
              <FolderIcon className="text-2xl text-primary" />
            </div>

            <h6 className="text-xl font-semibold dark:text-gray-200">Gerenciamento de projetos</h6>

            <p className="text-gray-600 dark:text-gray-500">
              Organize suas tarefas de forma visual e prática. Acompanhe cada etapa do seu projeto em um fluxo simples e intuitivo, sem complicações.
            </p>
          </div>
          <div className="p-4 flex flex-col size-fit gap-6 text-left border border-gray-300 rounded-xl bg-neutral-50 dark:border-slate-600 dark:bg-slate-900 h-auto">
            <div className="bg-primary/20 w-fit p-1.5 rounded">
              <CodeIcon className="text-2xl text-primary" />
            </div>

            <h6 className="text-xl font-semibold dark:text-gray-200">Ideal para projetos de código</h6>

            <p className="text-gray-600 dark:text-gray-500">
              Colunas pensadas para o ciclo de desenvolvimento: planejar, codar, testar e implementar. Um kanban adaptado ao jeito que programadores realmente trabalham.
            </p>
          </div>
          <div className="p-4 flex flex-col size-fit gap-6 text-left border border-gray-300 rounded-xl bg-neutral-50 dark:border-slate-600 dark:bg-slate-900 h-auto">
            <div className="bg-primary/20 w-fit p-1.5 rounded">
              <LightningIcon className="text-2xl text-primary" />
            </div>

            <h6 className="text-xl font-semibold dark:text-gray-200">Simplicidade</h6>

            <p className="text-gray-600 dark:text-gray-500">
              Nada de configurações infinitas ou sobrecarga de opções. É entrar, criar seus cards e começar a gerenciar de imediato.
            </p>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="pb-26 mx-6 text-center">
        <h2 className="text-3xl font-bold mb-3 dark:text-gray-200">Como funciona?</h2>
        <p className="text-xl text-gray-600 mb-16 dark:text-gray-500">Um breve exemplo de como funciona o kanban</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 border border-gray-300 rounded-xl bg-neutral-50 container mx-auto p-3 dark:border-slate-600 dark:bg-slate-900">
          <div>
            <h6 className="font-medium mb-2 dark:text-gray-200">A fazer</h6>

            <div className="text-left border border-l-2 border-green-500 rounded-md bg-white p-3 dark:border-green-700 dark:bg-slate-800">
              <TaskCategoryBadge className="w-fit" category="backend"/>
              <h6 className="mt-3 font-medium dark:text-gray-200">Função de divisão</h6>
              <div className="mt-3 flex flex-col gap-1">
                <div className="flex justify-between">
                  <small className="dark:text-gray-200">Progresso</small>
                  <small className="dark:text-gray-200">0%</small>
                </div>
                <progress value={0} max={100}></progress>
              </div>
              <TaskPriorityBadge className="mt-6" priority="medium"/>
            </div>

            <div className="text-left border border-l-2 border-green-500 rounded-md bg-white p-3 dark:border-green-700 dark:bg-slate-800 mt-3">
              <TaskCategoryBadge className="w-fit" category="backend"/>
              <h6 className="mt-3 font-medium dark:text-gray-200">Função de multiplicação</h6>
              <div className="mt-3 flex flex-col gap-1">
                <div className="flex justify-between">
                  <small className="dark:text-gray-200">Progresso</small>
                  <small className="dark:text-gray-200">0%</small>
                </div>
                <progress value={0} max={100}></progress>
              </div>
              <TaskPriorityBadge className="mt-6" priority="low"/>
            </div>
          </div>
          <div>
            <h6 className="font-medium mb-2 dark:text-gray-200">Em progresso</h6>

            <div className="text-left border border-l-2 border-purple-500 rounded-md bg-white p-3 dark:border-purple-700 dark:bg-slate-800">
              <TaskCategoryBadge className="w-fit" category="ui_ux"/>
              <h6 className="mt-3 font-medium dark:text-gray-200">Interface de usuário</h6>
              <div className="mt-3 flex flex-col gap-1">
                <div className="flex justify-between">
                  <small className="dark:text-gray-200">Progresso</small>
                  <small className="dark:text-gray-200">50%</small>
                </div>
                <progress value={50} max={100}></progress>
              </div>
              <div>
                <h6 className="text-sm dark:text-gray-200 mt-4 text-center">Sub-tarefas</h6>
                <div className="border-l-2 border-gray-300 ml-2 pl-2 dark:border-gray-600">
                  <div className="text-sm flex items-center gap-3 mt-2">
                    <div className="size-3 bg-success"></div>
                    <label htmlFor="subtask" className="text-gray-600 dark:text-gray-200 line-through">Navegação entre páginas</label>
                  </div>
                  <div className="text-sm flex items-center gap-3 mt-2">
                    <div className="size-3 border border-gray-300 dark:border-gray-600"></div>
                    <label htmlFor="subtask" className="text-gray-600 dark:text-gray-200">Responsividade</label>
                  </div>
                </div>
              </div>
              <TaskPriorityBadge className="mt-6" priority="high"/>
            </div>
          </div>
          <div>
            <h6 className="font-medium mb-2 dark:text-gray-200">Testando</h6>

            <div className="text-left border border-l-2 border-green-500 rounded-md bg-white p-3 dark:border-green-700 dark:bg-slate-800">
              <TaskCategoryBadge className="w-fit" category="backend"/>
              <h6 className="mt-3 font-medium dark:text-gray-200">Função de soma</h6>
              <div className="mt-3 flex flex-col gap-1">
                <div className="flex justify-between">
                  <small className="dark:text-gray-200">Progresso</small>
                  <small className="dark:text-gray-200">33%</small>
                </div>
                <progress value={33} max={100}></progress>
              </div>
              <div>
                <h6 className="text-sm dark:text-gray-200 mt-4 text-center">Sub-tarefas</h6>
                <div className="border-l-2 border-gray-300 ml-2 pl-2 dark:border-gray-600">
                  <div className="text-sm flex items-center gap-3 mt-2">
                    <div className="size-3 bg-success"></div>
                    <label htmlFor="subtask" className="text-gray-600 dark:text-gray-200">Somar números positivos</label>
                  </div>
                  <div className="text-sm flex items-center gap-3 mt-2">
                    <div className="size-3 border border-gray-300 dark:border-slate-600"></div>
                    <label htmlFor="subtask" className="text-gray-600 dark:text-gray-200">Somar números negativos</label>
                  </div>
                  <div className="text-sm flex items-center gap-3 mt-2">
                    <div className="size-3 border border-gray-300 dark:border-slate-600"></div>
                    <label htmlFor="subtask" className="text-gray-600 dark:text-gray-200">Somar zeros</label>
                  </div>
                </div>
              </div>
              <TaskPriorityBadge className="mt-6" priority="high"/>
            </div>
          </div>
          <div>
            <h6 className="font-medium mb-2 dark:text-gray-200">Implementado</h6>

            <div className="text-left border border-l-2 border-blue-500 rounded-md bg-white p-3 dark:border-blue-700 dark:bg-slate-800 opacity-40">
              <TaskCategoryBadge className="w-fit" category="frontend"/>
              <h6 className="mt-3 font-medium dark:text-gray-200 line-through">Criar landing page</h6>
              <div className="mt-3 flex flex-col gap-1">
                <div className="flex justify-between">
                  <small className="dark:text-gray-200">Progresso</small>
                  <small className="dark:text-gray-200">100%</small>
                </div>
                <progress value={100} max={100}></progress>
              </div>
              <div>
                <h6 className="text-sm dark:text-gray-200 mt-4 text-center">Sub-tarefas</h6>
                <div className="border-l-2 border-gray-300 ml-2 pl-2 dark:border-gray-600">
                  <div className="text-sm flex items-center gap-3 mt-2">
                    <div className="size-3 bg-success"></div>
                    <label htmlFor="subtask" className="text-gray-600 dark:text-gray-200 line-through">Criar o navbar</label>
                  </div>
                  <div className="text-sm flex items-center gap-3 mt-2">
                    <div className="size-3 bg-success"></div>
                    <label htmlFor="subtask" className="text-gray-600 dark:text-gray-200 line-through">Criar o footer</label>
                  </div>
                </div>
              </div>
              <TaskPriorityBadge className="mt-6" priority="low"/>
            </div>
          </div>
        </div>
      </section>

      <footer className="flex flex-col gap-3 sm:flex-row sm:gap-0 justify-between items-center border-t border-gray-300 px-5 py-6 dark:border-slate-800">
        <KanbanIcon className="text-4xl text-gray-600"/>
        <span className="text-gray-600">{new Date().getFullYear()} - Marcelo Sarinho</span>
        <div className="flex gap-3">
          <Link to="https://github.com/marcelosarinho/kanban" target="_blank" rel="noreferrer">
            <GithubLogoIcon className="text-3xl text-gray-600"/>
          </Link>

          <Link to="https://br.linkedin.com/in/marcelo-sarinho" target="_blank" rel="noreferrer">
            <LinkedinLogoIcon className="text-3xl text-gray-600"/>
          </Link>
        </div>
      </footer>
    </main>
  )
}