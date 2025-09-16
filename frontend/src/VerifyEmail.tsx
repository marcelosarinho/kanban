import ThemeButton from "./components/ThemeButton";
import Button from "./components/Button";
import { EnvelopeIcon } from "@phosphor-icons/react";

export default function VerifyEmail() {
  return (
    <main className="flex justify-center items-center h-screen">
      <ThemeButton className="fixed top-4 right-4" />

      <div className="animate-in min-w-1/2 max-w-sm lg:min-w-1/3 lg:max-w-lg xl:min-w-1/4 xl:max-w-xl border rounded-lg bg-white border-neutral-300 dark:bg-slate-900 dark:border-slate-700 shadow-lg">
        <header className="border-b border-neutral-300 dark:border-slate-700 p-6">
          <EnvelopeIcon className="mx-auto mb-3 animate-slide-in-from-bottom dark:text-gray-300" size={64} />
          <h1 className="text-center dark:text-gray-300 text-2xl font-medium animate-slide-in-from-bottom">Confirmação de cadastro</h1>
        </header>
        <div className="p-6">
          <p className="text-center dark:text-gray-300 text-md animate-slide-in-from-bottom">
            Para verificar seu email e concluir seu cadastro, clique no botão abaixo.
          </p>
          <Button className="animate-slide-in-from-bottom justify-center mx-auto mt-4">Verificar email</Button>
        </div>
      </div>
    </main>
  )
}