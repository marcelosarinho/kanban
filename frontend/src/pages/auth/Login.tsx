import Button from "@components/Button";
import Input from "@components/Input";
import { userLoginSchema } from "@schemas/user";
import type z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import UserFormMessage from "@components/auth/UserFormMessage";
import LoginCardBody from "@components/auth/LoginCardBody";
import LoginCardHeader from "@components/auth/LoginCardHeader";
import LoginCard from "@components/auth/LoginCard";
import LoginCardFooter from "@components/auth/LoginCardFooter";
import { Link, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { login } from "@api/user";

type Inputs = z.infer<typeof userLoginSchema>;

export default function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(userLoginSchema),
  })

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data, variables) => {
      const { deviceStatus } = data.data;

      if (deviceStatus === "unverified") {
        return navigate('/auth/verify-device', { state: { email: variables.email, reason: data.data.reason } });
      }

      return navigate('/kanban');
    }
  })

  function onSubmit(data: Inputs) {
    loginMutation.mutate(data);
  }

  return (
    <LoginCard>
      <LoginCardHeader>
        <h1 className="animate-slide-in-from-bottom text-center dark:text-gray-300 text-2xl font-medium">Login</h1>
      </LoginCardHeader>
      <LoginCardBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset disabled={loginMutation.isPending} className="flex flex-col gap-4">
            {loginMutation.isError && (
              <UserFormMessage variant="error" message={loginMutation.error?.message} />
            )}
            <Input error={errors.email?.message} {...register('email')} className="animate-slide-in-from-bottom" label="Email" type="email" name="email" id="email" />
            <Input error={errors.password?.message} {...register('password')} className="animate-slide-in-from-bottom" label="Senha" type="password" name="password" id="password" isPassword />
            <Link to="/auth/forgot-password" className="w-fit animate-slide-in-from-bottom text-sm text-primary cursor-pointer hover:text-primary/80 transition-colors">
              Esqueceu sua senha?
            </Link>
            <Button className="animate-slide-in-from-bottom justify-center" loading={loginMutation.isPending}>Entrar</Button>
          </fieldset>
        </form>
      </LoginCardBody>
      <LoginCardFooter>
        <p className="animate-slide-in-from-bottom text-center dark:text-gray-300 text-sm">Não tem conta? <Link to="/auth/sign-up" className="text-primary cursor-pointer hover:text-primary/80 transition-colors">Cadastre-se de graça!</Link></p>
      </LoginCardFooter>
    </LoginCard>
  )
}