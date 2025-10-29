import LoginCard from "@components/auth/LoginCard";
import LoginCardHeader from "@components/auth/LoginCardHeader";
import LoginCardBody from "@components/auth/LoginCardBody";
import LoginCardFooter from "@components/auth/LoginCardFooter";
import Button from "@components/button/Button";
import Input from "@components/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userForgotPasswordSchema } from "@schemas/user";
import type z from "zod";
import { Link } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "@api/index";
import { useState } from "react";
import { EnvelopeIcon, SignInIcon } from "@phosphor-icons/react";
import UserFormMessage from "@components/auth/UserFormMessage";

type InputsForgotPassword = z.infer<typeof userForgotPasswordSchema>;

export default function ForgotPassword() {
  const [formType, setFormType] = useState<'forgot-password' | 'forgot-password-email-sent'>('forgot-password');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsForgotPassword>({
    resolver: zodResolver(userForgotPasswordSchema),
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      setFormType('forgot-password-email-sent');
    },
  });

  function onSubmitForgotPassword(data: InputsForgotPassword) {
    forgotPasswordMutation.mutate(data);
  }

  return (
    <>
      {formType === 'forgot-password' && (
        <LoginCard>
          <LoginCardHeader>
            <h1 className="animate-slide-in-from-bottom text-center dark:text-gray-300 text-2xl font-medium">Esqueceu a senha?</h1>
          </LoginCardHeader>
          <LoginCardBody>
            <form onSubmit={handleSubmit(onSubmitForgotPassword)}>
            <p className="animate-slide-in-from-bottom text-center dark:text-gray-300 text-md mb-4">Um email será enviado com as instruções necessárias para redefinir sua senha.</p>
            <fieldset disabled={forgotPasswordMutation.isPending} className="flex flex-col gap-4 disabled:opacity-50">
              {forgotPasswordMutation.isError && (
                <UserFormMessage variant="error" message={forgotPasswordMutation.error?.message} />
              )}
              <Input error={errors.email?.message} {...register('email')} className="animate-slide-in-from-bottom" label="Email" type="email" name="email" id="email" />
              <Button className="animate-slide-in-from-bottom justify-center" loading={forgotPasswordMutation.isPending}>Enviar</Button>
            </fieldset>
          </form>
          </LoginCardBody>
          <LoginCardFooter>
            <p className="animate-slide-in-from-bottom text-center dark:text-gray-300 text-sm">Lembrou sua senha? <Link to="/auth/login" className="text-primary cursor-pointer hover:text-primary/80 transition-colors">Faça login!</Link></p>
          </LoginCardFooter>
        </LoginCard>
      )}

      {formType === 'forgot-password-email-sent' && (
        <LoginCard>
          <LoginCardHeader>
            <EnvelopeIcon className="mx-auto mb-3 animate-slide-in-from-bottom dark:text-gray-300" size={64} />
            <h1 className="animate-slide-in-from-bottom text-center dark:text-gray-300 text-2xl font-medium">Email enviado</h1>
          </LoginCardHeader>
          <LoginCardBody className="text-center">
            <p className="animate-slide-in-from-bottom text-center dark:text-gray-300 text-md">Um email foi enviado para você com as instruções necessárias para redefinir sua senha.</p>
            <Link
              to="/auth/login"
              className="inline-flex items-center gap-1 bg-primary text-white px-3 py-2 rounded-md text-sm font-medium mt-6 hover:-translate-y-1 transition"
            >
              <SignInIcon weight="bold" className="text-lg"/>
              Fazer login
            </Link>
          </LoginCardBody>
        </LoginCard>
      )}
    </>
  )
}