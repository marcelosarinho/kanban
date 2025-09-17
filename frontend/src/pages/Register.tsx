import LoginCard from "../components/LoginCard";
import LoginCardHeader from "../components/LoginCardHeader";
import LoginCardBody from "../components/LoginCardBody";
import LoginCardFooter from "../components/LoginCardFooter";
import Button from "../components/Button";
import Input from "../components/Input";
import UserFormMessage from "../components/UserFormMessage";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userRegisterSchema } from "../schemas/user";
import type z from "zod";
import { createUser } from "../api";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router";

type InputsRegister = z.infer<typeof userRegisterSchema>;

export default function Register() {
  const {
    register: registerRegister,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors },
  } = useForm<InputsRegister>({
    resolver: zodResolver(userRegisterSchema),
  });

  const registerMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      alert('Registrou');
    }
  });

  function onSubmitRegister(data: InputsRegister) {
    registerMutation.mutate(data);
  }

  return (
    <LoginCard>
      <LoginCardHeader>
        <h1 className="animate-slide-in-from-bottom text-center dark:text-gray-300 text-2xl font-medium">Cadastre-se</h1>
      </LoginCardHeader>
      <LoginCardBody>
        <form onSubmit={handleRegisterSubmit(onSubmitRegister)}>
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
        <p className="animate-slide-in-from-bottom text-center dark:text-gray-300 text-sm">Já tem conta? <Link to="/login" className="text-primary cursor-pointer hover:text-primary/80 transition-colors">Faça login!</Link></p>
      </LoginCardFooter>
    </LoginCard>
  )
}