import { useState } from "react";
import Button from "./components/Button";
import Input from "./components/Input";
import ThemeButton from "./components/ThemeButton";
import { userForgotPasswordSchema, userLoginSchema, userRegisterSchema } from "./schemas/user";
import type z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoginError from "./components/LoginError";

type FormType = 'login' | 'register' | 'forgot-password';

type InputsLogin = z.infer<typeof userLoginSchema>;
type InputsRegister = z.infer<typeof userRegisterSchema>;
type InputsForgotPassword = z.infer<typeof userForgotPasswordSchema>;

export default function Login() {
  const [formType, setFormType] = useState<FormType>('login');

  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<InputsLogin>({
    resolver: zodResolver(userLoginSchema),
  })

  const {
    register: registerRegister,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors },
  } = useForm<InputsRegister>({
    resolver: zodResolver(userRegisterSchema),
  });

  const {
    register: registerForgotPassword,
    handleSubmit: handleForgotPasswordSubmit,
    formState: { errors: forgotPasswordErrors },
  } = useForm<InputsForgotPassword>({
    resolver: zodResolver(userForgotPasswordSchema),
  });

  function onSubmit() {
    console.log('foi');
  }

  return (
    <main className="flex justify-center items-center h-screen">
      <ThemeButton className="fixed top-4 right-4" />

      {formType === 'login' && (
        <div className="animate-in min-w-1/2 max-w-sm lg:min-w-1/3 lg:max-w-lg xl:min-w-1/4 xl:max-w-xl border rounded-lg bg-white border-neutral-300 dark:bg-slate-900 dark:border-slate-700 shadow-lg">
          <div className="border-b border-neutral-300 dark:border-slate-700 p-6">
            <h1 className="animate-slide-in-from-bottom text-center dark:text-gray-300 text-2xl font-medium">Login</h1>
          </div>
          <form onSubmit={handleLoginSubmit(onSubmit)} className="p-6">
            <fieldset className="flex flex-col gap-4">
              <LoginError error="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis rerum quisquam quam incidunt repellat. Quis soluta, quas commodi accusamus excepturi aspernatur, quod recusandae perferendis error nesciunt voluptatibus omnis dolorem nostrum eius, odio porro suscipit hic animi repellat aliquid eaque? Quo expedita eligendi rerum sed consequuntur aliquid, odit repellat recusandae tenetur?" />
              <Input error={loginErrors.email?.message} {...registerLogin('email')} className="animate-slide-in-from-bottom" label="Email" type="email" name="email" id="email" />
              <Input error={loginErrors.password?.message} {...registerLogin('password')} className="animate-slide-in-from-bottom" label="Senha" type="password" name="password" id="password" isPassword />
              <span
                onClick={() => setFormType('forgot-password')}
                className="animate-slide-in-from-bottom text-sm text-primary cursor-pointer hover:text-primary/80 transition-colors"
              >
                Esqueceu sua senha?
              </span>
              <Button className="animate-slide-in-from-bottom justify-center">Entrar</Button>
            </fieldset>
          </form>
          <div className="p-6 border-t border-neutral-300 dark:border-slate-700">
            <p className="animate-slide-in-from-bottom text-center dark:text-gray-300 text-sm">Não tem conta? <span onClick={() => setFormType('register')} className="text-primary cursor-pointer hover:text-primary/80 transition-colors">Cadastre-se de graça!</span></p>
          </div>
        </div>
      )}
      {formType === 'register' && (
        <div className="animate-in min-w-1/2 max-w-sm lg:min-w-1/3 lg:max-w-lg xl:min-w-1/4 xl:max-w-xl border rounded-lg bg-white border-neutral-300 dark:bg-slate-900 dark:border-slate-700 shadow-lg">
          <div className="border-b border-neutral-300 dark:border-slate-700 p-6">
            <h1 className="animate-slide-in-from-bottom text-center dark:text-gray-300 text-2xl font-medium">Cadastre-se</h1>
          </div>
          <form className="p-6" action="">
            <fieldset className="flex flex-col gap-4">
              <Input className="animate-slide-in-from-bottom" label="Nome" type="text" name="name" id="name" />
              <Input className="animate-slide-in-from-bottom" label="Email" type="email" name="email" id="email" />
              <Input className="animate-slide-in-from-bottom" label="Senha" type="password" name="password" id="password" isPassword />
              <Input className="animate-slide-in-from-bottom" label="Confirmar senha" type="password" name="password_confirmation" id="password_confirmation" isPassword />
              <Button className="animate-slide-in-from-bottom justify-center">Cadastrar</Button>
            </fieldset>
          </form>
          <div className="p-6 border-t border-neutral-300 dark:border-slate-700">
            <p className="animate-slide-in-from-bottom text-center dark:text-gray-300 text-sm">Já tem conta? <span onClick={() => setFormType('login')} className="text-primary cursor-pointer hover:text-primary/80 transition-colors">Faça login!</span></p>
          </div>
        </div>
      )}
      {formType === 'forgot-password' && (
        <div className="animate-in min-w-1/2 max-w-sm lg:min-w-1/3 lg:max-w-lg xl:min-w-1/4 xl:max-w-xl border rounded-lg bg-white border-neutral-300 dark:bg-slate-900 dark:border-slate-700 shadow-lg">
          <div className="border-b border-neutral-300 dark:border-slate-700 p-6">
            <h1 className="animate-slide-in-from-bottom text-center dark:text-gray-300 text-2xl font-medium">Esqueceu a senha?</h1>
          </div>
          <form className="p-6" action="">
            <p className="animate-slide-in-from-bottom text-center dark:text-gray-300 text-sm mb-4">Um email será enviado com as instruções necessárias para redefinir sua senha.</p>
            <fieldset className="flex flex-col gap-4">
              <Input className="animate-slide-in-from-bottom" label="Email" type="email" name="email" id="email" />
              <Button className="animate-slide-in-from-bottom justify-center">Recuperar</Button>
            </fieldset>
          </form>
          <div className="p-6 border-t border-neutral-300 dark:border-slate-700">
            <p className="animate-slide-in-from-bottom text-center dark:text-gray-300 text-sm">Lembrou sua senha? <span onClick={() => setFormType('login')} className="text-primary cursor-pointer hover:text-primary/80 transition-colors">Faça login!</span></p>
          </div>
        </div>
      )}
    </main>
  )
}