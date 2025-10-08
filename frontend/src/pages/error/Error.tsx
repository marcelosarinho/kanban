import { ArrowLeftIcon } from "@phosphor-icons/react";
import { Link } from "react-router";

export default function Error() {
  return (
    <main className="flex flex-col-reverse items-center justify-center gap-8 h-screen md:flex-row mx-16 my-16 md:my-0 xl:mx-0">
      <div className="text-center md:text-left flex-shrink">
        <h2 className="text-2xl dark:text-gray-300 mb-4">ERRO 404</h2>
        <h1 className="text-4xl font-medium dark:text-gray-300 mb-4">Página não encontrada!</h1>
        <p className="text-lg dark:text-gray-300">A página que você está tentando acessar não foi encontrada ou pode ter sido removida.</p>
        <Link
          className="flex w-fit gap-1 items-center bg-primary text-white px-3 py-2 rounded-md text-sm font-medium mt-6 hover:-translate-y-1 transition"
          to="/kanban"
        >
          <ArrowLeftIcon weight="bold" className="text-lg" />
          Ir para a página inicial
        </Link>
      </div>
      <img src="/404.svg" alt="Imagem de erro 404" className="w-64 lg:w-80" />
    </main>
  )
}