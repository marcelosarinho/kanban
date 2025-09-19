import TaskCategoryBadge from "@components/TaskCategoryBadge";
import TaskPriorityBadge from "@components/TaskPriorityBadge";
import { ArrowRightIcon, FolderIcon, GithubLogoIcon, KanbanIcon, LinkedinLogoIcon } from "@phosphor-icons/react";
import { useRef } from "react";
import { Link } from "react-router";

export default function Home() {
  const darkMode = useRef(window.matchMedia("(prefers-color-scheme: dark)"));

  document.documentElement.classList.toggle('dark', darkMode.current.matches);

  darkMode.current.addEventListener('change', () => {
    document.documentElement.classList.toggle('dark', darkMode.current.matches);
  });

  return (
    <main>
      <nav className="fixed top-2 w-full bg-transparent">
        <div className="px-6">
          <div className="bg-white dark:bg-slate-950 flex items-center justify-between border border-gray-200 p-3 rounded-lg dark:border-slate-800 shadow-sm">
            <KanbanIcon className="text-3xl dark:text-gray-200" />

            <div className="flex items-center gap-3 dark:text-gray-200">
              <a href="#features" className="inline-block hover:bg-neutral-200 dark:hover:bg-slate-700 px-2 py-1 rounded dark:hover:text-white transition-colors">
                Funcionalidades
              </a>

              <a href="#how-it-works" className="inline-block hover:bg-neutral-200 dark:hover:bg-slate-700 px-2 py-1 rounded dark:hover:text-white transition-colors">
                Como funciona?
              </a>

              <Link
                to="/auth/login"
                className="inline-block hover:bg-neutral-200 dark:hover:bg-slate-700 px-2 py-1 rounded dark:hover:text-white transition-colors">
                  Fazer login
              </Link>

              <Link
                to="/auth/sign-up"
                className="inline-block rounded border border-neutral-300 hover:border-neutral-400 dark:border-slate-600 px-2 py-1 dark:hover:border-slate-500 transition-colors dark:hover:text-white">
                  Cadastre-se
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="py-36 mx-6 text-center">
        <h1 className="text-5xl font-bold mb-6">Organize seus projetos. <span className="text-primary">Visualize progreso.</span></h1>
        <p className="text-xl text-gray-600 mb-6">Um quadro kanban simples e eficiente para ajudar você a gerenciar seus projetos pessoais de programação.</p>
        <div className="flex justify-center gap-3">
          <Link
            to="/auth/sign-up"
            className="text-xl inline-flex items-center gap-2 rounded border bg-white border-neutral-300 hover:border-neutral-400 dark:border-slate-600 px-3 py-2 dark:hover:border-slate-500 transition-colors dark:hover:text-white">
            Comece agora
            <ArrowRightIcon weight="bold"/>
          </Link>

          <Link
            to="/auth/login"
            className="text-xl inline-flex items-center gap-2 rounded dark:border-slate-600 px-3 py-2 dark:hover:border-slate-500 transition-colors dark:hover:text-white bg-primary/15 hover:bg-primary/25">
            Faça login
          </Link>
        </div>
      </section>

      <section id="features" className="pb-36 mx-6 text-center">
        <h2 className="text-4xl font-bold mb-3">Tudo o que você precisa</h2>
        <p className="text-xl text-gray-600 mb-16">Ferramentas que auxiliam você a se manter organizado e produtivo</p>
        <div className="container grid grid-cols-3 gap-6 mx-auto">
          <div className="p-4 flex flex-col size-fit gap-6 text-left border border-gray-300 rounded-xl bg-neutral-50">
            <div className="bg-primary/20 w-fit p-1.5 rounded">
              <FolderIcon className="text-2xl text-primary" />
            </div>

            <h6 className="text-xl font-semibold">Gerenciamento de projetos</h6>

            <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
          <div className="p-4 flex flex-col size-fit gap-6 text-left border border-gray-300 rounded-xl bg-neutral-50">
            <div className="bg-primary/20 w-fit p-1.5 rounded">
              <FolderIcon className="text-2xl text-primary" />
            </div>

            <h6 className="text-xl font-semibold">Gerenciamento de projetos</h6>

            <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
          <div className="p-4 flex flex-col size-fit gap-6 text-left border border-gray-300 rounded-xl bg-neutral-50">
            <div className="bg-primary/20 w-fit p-1.5 rounded">
              <FolderIcon className="text-2xl text-primary" />
            </div>

            <h6 className="text-xl font-semibold">Gerenciamento de projetos</h6>

            <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="pb-26 mx-6 text-center">
        <h2 className="text-3xl font-bold mb-3">Como funciona?</h2>
        <p className="text-xl text-gray-600 mb-16">Um breve exemplo de como funciona o kanban</p>
        <div className="grid grid-cols-4 gap-3 border border-gray-300 rounded-xl bg-neutral-50 container mx-auto p-3">
          <div>
            <h6 className="font-medium mb-2">A fazer</h6>
          </div>
          <div>
            <h6 className="font-medium mb-2">Em progresso</h6>
          </div>
          <div>
            <h6 className="font-medium mb-2">Testando</h6>
          </div>
          <div>
            <h6 className="font-medium mb-2">Implementado</h6>
            <div className="text-left border border-l-2 border-blue-500 rounded-md bg-white p-3">
              <TaskCategoryBadge className="w-fit" category="frontend"/>
              <h6 className="mt-3 font-medium">Criar landing page</h6>
              <div className="mt-3 flex flex-col gap-1">
                <div className="flex justify-between">
                  <small>Progresso</small>
                  <small>50%</small>
                </div>
                <progress value={50} max={100}></progress>
              </div>
              <div>
                <h6 className="text-sm">Sub-tarefas</h6>
                <div className="text-sm border-l-2 border-gray-300 ml-2 pl-2">
                  Teste
                </div>
              </div>
              <TaskPriorityBadge className="mt-3" priority="low"/>
            </div>
          </div>
        </div>
      </section>

      <footer className="flex justify-between items-center border-t border-gray-300 px-5 py-6">
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