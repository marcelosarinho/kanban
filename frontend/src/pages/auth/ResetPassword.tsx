import { resetPassword } from "@api/index";
import Button from "@components/button/Button";
import Input from "@components/Input";
import LoginCard from "@components/auth/LoginCard";
import LoginCardBody from "@components/auth/LoginCardBody";
import LoginCardHeader from "@components/auth/LoginCardHeader";
import UserFormMessage from "@components/auth/UserFormMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftIcon, XCircleIcon } from "@phosphor-icons/react";
import { userResetPasswordSchema } from "@schemas/user";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useLoaderData, useNavigate } from "react-router";
import type z from "zod";

type Inputs = z.infer<typeof userResetPasswordSchema>;

export default function ResetPassword() {
  const { token, email, valid, message } = useLoaderData();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: zodResolver(userResetPasswordSchema),
  });

  const resetPasswordMutation = useMutation({
    mutationFn: (data: Inputs) => resetPassword({ token, email, password: data.password }),
    onSuccess: () => {
      setTimeout(() => {
        navigate('/auth/login');
      }, 3000);
    }
  });

  function onSubmit(data: Inputs) {
    resetPasswordMutation.mutate(data);
  }

  function renderResetPassword() {
    if (valid) {
      return (
        <LoginCard>
          <LoginCardHeader>
            <h1 className="animate-slide-in-from-bottom text-center dark:text-gray-300 text-2xl font-medium">Redefinir senha</h1>
          </LoginCardHeader>
          <LoginCardBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <fieldset disabled={resetPasswordMutation.isPending} className="flex flex-col gap-4 disabled:opacity-50">
                {resetPasswordMutation.isSuccess && (
                  <UserFormMessage variant="success" message="Senha redefinida com sucesso! Redirecionando para a tela de login..." />
                )}
                {resetPasswordMutation.isError && (
                  <UserFormMessage variant="error" message={resetPasswordMutation.error?.message} />
                )}
                <Input error={errors.password?.message} {...register('password')} className="animate-slide-in-from-bottom" label="Nova senha" type="password" name="password" id="password" isPassword />
                <Input error={errors.password_confirmation?.message} {...register('password_confirmation')} className="animate-slide-in-from-bottom" label="Confirmar nova senha" type="password" name="password_confirmation" id="password_confirmation" isPassword />
                <Button className="animate-slide-in-from-bottom justify-center" loading={resetPasswordMutation.isPending}>Enviar</Button>
              </fieldset>
            </form>
          </LoginCardBody>
        </LoginCard>
      )
    }

    return (
      <LoginCard>
        <LoginCardHeader>
          <XCircleIcon className="mx-auto mb-3 animate-slide-in-from-bottom text-danger" size={64} />
          <h1 className="animate-slide-in-from-bottom text-center dark:text-gray-300 text-2xl font-medium">Erro ao redefinir senha!</h1>
        </LoginCardHeader>
        <LoginCardBody className="text-center">
          <p className="animate-slide-in-from-bottom dark:text-gray-300 text-md">{message || 'Token inválido!'}</p>
          <p className="animate-slide-in-from-bottom dark:text-gray-300 text-md">Por favor, tente novamente.</p>

          <Link
              to="/auth/login"
              className="mx-auto flex gap-1 w-fit bg-primary text-white px-3 py-2 rounded-md text-sm font-medium mt-6 hover:-translate-y-1 transition"
            >
              <ArrowLeftIcon weight="bold" className="text-lg" />
              Retornar
          </Link>
        </LoginCardBody>
      </LoginCard>
    )
  }

  return renderResetPassword();
}