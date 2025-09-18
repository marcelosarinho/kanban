import LoginCard from "../../components/LoginCard";
import LoginCardHeader from "../../components/LoginCardHeader";
import LoginCardBody from "../../components/LoginCardBody";
import LoginCardFooter from "../../components/LoginCardFooter";
import Button from "../../components/Button";
import Input from "../../components/Input";
import UserFormMessage from "../../components/UserFormMessage";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userRegisterSchema } from "../../schemas/user";
import type z from "zod";
import { createUser } from "../../api";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router";
import { useState } from "react";
import { EnvelopeIcon } from "@phosphor-icons/react";

type InputsRegister = z.infer<typeof userRegisterSchema>;

export default function Register() {
  const [formType, setFormType] = useState<'register' | 'register-email-sent'>('register');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsRegister>({
    resolver: zodResolver(userRegisterSchema),
  });

  const registerMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      setFormType('register-email-sent');
    }
  });

  function onSubmitRegister(data: InputsRegister) {
    registerMutation.mutate(data);
  }

  return (
    <>
      {formType === 'register' && (
        <LoginCard>
        <LoginCardHeader>
          <h1 className="animate-slide-in-from-bottom text-center dark:text-gray-300 text-2xl font-medium">Cadastre-se</h1>
        </LoginCardHeader>
        <LoginCardBody>
          <form onSubmit={handleSubmit(onSubmitRegister)}>
          <fieldset disabled={registerMutation.isPending} className="flex flex-col gap-4">
            {registerMutation.isError && (
              <UserFormMessage variant="error" message={registerMutation.error?.message} />
            )}
            <Input error={errors.name?.message} {...register('name')} className="animate-slide-in-from-bottom" label="Nome" type="text" name="name" id="name" />
            <Input error={errors.email?.message} {...register('email')} className="animate-slide-in-from-bottom" label="Email" type="email" name="email" id="email" />
            <Input error={errors.password?.message} {...register('password')} className="animate-slide-in-from-bottom" label="Senha" type="password" name="password" id="password" isPassword />
            <Input error={errors.password_confirmation?.message} {...register('password_confirmation')} className="animate-slide-in-from-bottom" label="Confirmar senha" type="password" name="password_confirmation" id="password_confirmation" isPassword />
            <Button type="submit" className="animate-slide-in-from-bottom justify-center" loading={registerMutation.isPending}>Cadastrar</Button>
          </fieldset>
        </form>
        </LoginCardBody>
        <LoginCardFooter>
          <p className="animate-slide-in-from-bottom text-center dark:text-gray-300 text-sm">Já tem conta? <Link to="/login" className="text-primary cursor-pointer hover:text-primary/80 transition-colors">Faça login!</Link></p>
        </LoginCardFooter>
      </LoginCard>
      )}

      {formType === 'register-email-sent' && (
        <LoginCard>
          <LoginCardHeader>
            <EnvelopeIcon className="mx-auto mb-3 animate-slide-in-from-bottom dark:text-gray-300" size={64} />
            <h1 className="animate-slide-in-from-bottom text-center dark:text-gray-300 text-2xl font-medium">Email enviado</h1>
          </LoginCardHeader>
          <LoginCardBody className="text-center">
            <p className="animate-slide-in-from-bottom text-center dark:text-gray-300 text-md">Um email foi enviado para você com as instruções necessárias para completar a verificação da sua conta.</p>
            <Link to="/login" className="inline-block bg-primary text-white px-3 py-2 rounded-md text-sm font-medium mt-6 hover:-translate-y-1 transition">Fazer login</Link>
          </LoginCardBody>
        </LoginCard>
      )}
    </>
  )
}