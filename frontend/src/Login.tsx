import { useState } from "react";
import Button from "./components/Button";
import Input from "./components/Input";

type FormType = 'login' | 'register' | 'forgot-password';

export default function Login() {
  const [formType, setFormType] = useState<FormType>('login');

  return (
    <main className="flex justify-center items-center h-screen">
      {formType === 'login' && (
        <div className="border rounded-lg bg-white border-neutral-300 dark:bg-slate-900 dark:border-slate-700 shadow-lg">
          <div className="border-b border-neutral-300 dark:border-slate-700 p-6">
            <h1 className="text-center dark:text-gray-300 text-2xl font-medium">Login</h1>
          </div>
          <form className="p-6" action="">
            <fieldset className="flex flex-col gap-4">
              <Input label="Email" type="email" name="email" id="email" />
              <Input label="Senha" type="password" name="password" id="password" />
              <span
                onClick={() => setFormType('forgot-password')}
                className="text-sm text-primary cursor-pointer hover:text-primary/80 transition-colors"
              >
                Esqueceu sua senha?
              </span>
              <Button className="justify-center">Entrar</Button>
            </fieldset>
          </form>
          <div className="p-6 border-t border-neutral-300 dark:border-slate-700">
            <p className="text-center dark:text-gray-300 text-sm">Não tem conta? <span onClick={() => setFormType('register')} className="text-primary cursor-pointer hover:text-primary/80 transition-colors">Cadastre-se de graça!</span></p>
          </div>
        </div>
      )}
      {formType === 'register' && (
        <div className="border rounded-lg bg-white border-neutral-300 dark:bg-slate-900 dark:border-slate-700 shadow-lg">
          <div className="border-b border-neutral-300 dark:border-slate-700 p-6">
            <h1 className="text-center dark:text-gray-300 text-2xl font-medium">Cadastre-se</h1>
          </div>
          <form className="p-6" action="">
            <fieldset className="flex flex-col gap-4">
              <Input label="Nome" type="text" name="name" id="name" />
              <Input label="Email" type="email" name="email" id="email" />
              <Input label="Senha" type="password" name="password" id="password" />
              <Button className="justify-center">Cadastrar</Button>
            </fieldset>
          </form>
          <div className="p-6 border-t border-neutral-300 dark:border-slate-700">
            <p className="text-center dark:text-gray-300 text-sm">Já tem conta? <span onClick={() => setFormType('login')} className="text-primary cursor-pointer hover:text-primary/80 transition-colors">Faça login!</span></p>
          </div>
        </div>
      )}
      {formType === 'forgot-password' && (
        <div className="border rounded-lg bg-white border-neutral-300 dark:bg-slate-900 dark:border-slate-700 shadow-lg">
          <div className="border-b border-neutral-300 dark:border-slate-700 p-6">
            <h1 className="text-center dark:text-gray-300 text-2xl font-medium">Esqueceu a senha?</h1>
          </div>
          <form className="p-6" action="">
            <p className="text-center dark:text-gray-300 text-sm mb-4">Um email será enviado com as instruções necessárias para redefinir sua senha.</p>
            <fieldset className="flex flex-col gap-4">
              <Input label="Email" type="email" name="email" id="email" />
              <Button className="justify-center">Recuperar</Button>
            </fieldset>
          </form>
          <div className="p-6 border-t border-neutral-300 dark:border-slate-700">
            <p className="text-center dark:text-gray-300 text-sm">Lembrou sua senha? <span onClick={() => setFormType('login')} className="text-primary cursor-pointer hover:text-primary/80 transition-colors">Faça login!</span></p>
          </div>
        </div>
      )}
    </main>
  )
}