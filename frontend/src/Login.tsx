import { useEffect, useState } from "react";
import Button from "./components/Button";
import Input from "./components/Input";
import ThemeButton from "./components/ThemeButton";
import { userForgotPasswordSchema, userLoginSchema, userRegisterSchema } from "./schemas/user";
import type z from "zod";
import { useForm, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createUser } from "./api";
import UserFormMessage from "./components/UserFormMessage";
import { EnvelopeIcon } from "@phosphor-icons/react";
import { censorEmail } from "./utils/functions";
import LoginCardBody from "./components/LoginCardBody";
import LoginCardHeader from "./components/LoginCardHeader";
import LoginCard from "./components/LoginCard";
import LoginCardFooter from "./components/LoginCardFooter";

type FormType = 'login' | 'register' | 'forgot-password' | 'register-email-sent' | 'confirm-login';

type InputsLogin = z.infer<typeof userLoginSchema>;
type InputsRegister = z.infer<typeof userRegisterSchema>;
type InputsForgotPassword = z.infer<typeof userForgotPasswordSchema>;

export default function Login() {
  const [formType, setFormType] = useState<FormType>('login');
  const [code, setCode] = useState('');

  useEffect(() => {
    if (code.length === 6) {
      console.log(code);
    }
  }, [code]);

  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
    watch: watchLogin,
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

  const registerMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      setFormType('register-email-sent');
    }
  })

  function onSubmitRegister(data: InputsRegister) {
    registerMutation.mutate(data);
  }

  function onSubmitLogin(data: InputsLogin) {
    setFormType('confirm-login');
    console.log(censorEmail(email));
  }

  function onSubmitForgotPassword(data: InputsForgotPassword) {
    console.log(data);
  }

  function onError(errors: FieldErrors<InputsRegister>) {
    console.log(errors)
  }

  const email = watchLogin('email');

  return (
    <main className="flex justify-center items-center h-screen">
      <ThemeButton className="fixed top-4 right-4" />

      {formType === 'login' && (
        <LoginCard>
          <LoginCardHeader>
            <h1 className="animate-slide-in-from-bottom text-center dark:text-gray-300 text-2xl font-medium">Login</h1>
          </LoginCardHeader>
          <LoginCardBody>
            <form onSubmit={handleLoginSubmit(onSubmitLogin)}>
              <fieldset className="flex flex-col gap-4">
                <UserFormMessage variant="success" message="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis rerum quisquam quam incidunt repellat. Quis soluta, quas commodi accusamus excepturi aspernatur, quod recusandae perferendis error nesciunt voluptatibus omnis dolorem nostrum eius, odio porro suscipit hic animi repellat aliquid eaque? Quo expedita eligendi rerum sed consequuntur aliquid, odit repellat recusandae tenetur?" />
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
          </LoginCardBody>
          <LoginCardFooter>
            <p className="animate-slide-in-from-bottom text-center dark:text-gray-300 text-sm">Não tem conta? <span onClick={() => setFormType('register')} className="text-primary cursor-pointer hover:text-primary/80 transition-colors">Cadastre-se de graça!</span></p>
          </LoginCardFooter>
        </LoginCard>
      )}

      {formType === 'register' && (
        <LoginCard>
          <LoginCardHeader>
            <h1 className="animate-slide-in-from-bottom text-center dark:text-gray-300 text-2xl font-medium">Cadastre-se</h1>
          </LoginCardHeader>
          <LoginCardBody>
            <form onSubmit={handleRegisterSubmit(onSubmitRegister, onError)}>
            <fieldset disabled={registerMutation.isPending} className="flex flex-col gap-4">
              {registerMutation.isError && (
                <UserFormMessage variant="error" message={registerMutation.error?.message} />
              )}
              <Input error={registerErrors.name?.message} {...registerRegister('name')} className="animate-slide-in-from-bottom" label="Nome" type="text" name="name" id="name" />
              <Input error={registerErrors.email?.message} {...registerRegister('email')} className="animate-slide-in-from-bottom" label="Email" type="email" name="email" id="email" />
              <Input error={registerErrors.password?.message} {...registerRegister('password')} className="animate-slide-in-from-bottom" label="Senha" type="password" name="password" id="password" isPassword />
              <Input error={registerErrors.password_confirmation?.message} {...registerRegister('password_confirmation')} className="animate-slide-in-from-bottom" label="Confirmar senha" type="password" name="password_confirmation" id="password_confirmation" isPassword />
              <Button type="submit" className="animate-slide-in-from-bottom justify-center" loading={registerMutation.isPending}>Cadastrar</Button>
            </fieldset>
          </form>
          </LoginCardBody>
          <LoginCardFooter>
            <p className="animate-slide-in-from-bottom text-center dark:text-gray-300 text-sm">Já tem conta? <span onClick={() => setFormType('login')} className="text-primary cursor-pointer hover:text-primary/80 transition-colors">Faça login!</span></p>
          </LoginCardFooter>
        </LoginCard>
      )}

      {formType === 'forgot-password' && (
        <LoginCard>
          <LoginCardHeader>
            <h1 className="animate-slide-in-from-bottom text-center dark:text-gray-300 text-2xl font-medium">Esqueceu a senha?</h1>
          </LoginCardHeader>
          <LoginCardBody>
            <form onSubmit={handleForgotPasswordSubmit(onSubmitForgotPassword)}>
            <p className="animate-slide-in-from-bottom text-center dark:text-gray-300 text-md mb-4">Um email será enviado com as instruções necessárias para redefinir sua senha.</p>
            <fieldset className="flex flex-col gap-4">
              <Input error={forgotPasswordErrors.email?.message} {...registerForgotPassword('email')} className="animate-slide-in-from-bottom" label="Email" type="email" name="email" id="email" />
              <Button className="animate-slide-in-from-bottom justify-center">Enviar</Button>
            </fieldset>
          </form>
          </LoginCardBody>
          <LoginCardFooter>
            <p className="animate-slide-in-from-bottom text-center dark:text-gray-300 text-sm">Lembrou sua senha? <span onClick={() => setFormType('login')} className="text-primary cursor-pointer hover:text-primary/80 transition-colors">Faça login!</span></p>
          </LoginCardFooter>
        </LoginCard>
      )}

      {formType === 'register-email-sent' && (
        <LoginCard>
          <LoginCardHeader>
            <EnvelopeIcon className="mx-auto mb-3 animate-slide-in-from-bottom dark:text-gray-300" size={64} />
            <h1 className="animate-slide-in-from-bottom text-center dark:text-gray-300 text-2xl font-medium">Email enviado</h1>
          </LoginCardHeader>
          <LoginCardBody>
            <p className="animate-slide-in-from-bottom text-center dark:text-gray-300 text-md">Um email foi enviado para você com as instruções necessárias para completar a verificação da sua conta.</p>
            <Button className="mx-auto mt-6" onClick={() => setFormType('login')}>Fazer login</Button>
          </LoginCardBody>
        </LoginCard>
      )}

      {formType === 'confirm-login' && (
        <LoginCard>
          <LoginCardHeader>
            <EnvelopeIcon className="mx-auto mb-3 animate-slide-in-from-bottom dark:text-gray-300" size={64} />
            <h1 className="text-center dark:text-gray-300 text-2xl font-medium animate-slide-in-from-bottom">
              Verificação de dispositivo
            </h1>
          </LoginCardHeader>
          <LoginCardBody>
            <p className="text-center dark:text-gray-300 text-md animate-slide-in-from-bottom">
              Você está fazendo login em um novo dispositivo. Para sua segurança, verifique o login confirmando o código enviado para o email {censorEmail(email)}.
            </p>
            <form className="mt-6">
              <fieldset>
                <Input value={code} onChange={(e) => setCode(e.target.value)} className="animate-slide-in-from-bottom mb-4" id="code" label="Código de verificação" placeholder="XXXXXX" maxLength={6} />
                <Button className="animate-slide-in-from-bottom justify-center w-full">Verificar</Button>
              </fieldset>
            </form>
          </LoginCardBody>
        </LoginCard>
      )}
    </main>
  )
}