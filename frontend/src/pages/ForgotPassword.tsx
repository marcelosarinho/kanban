import LoginCard from "../components/LoginCard";
import LoginCardHeader from "../components/LoginCardHeader";
import LoginCardBody from "../components/LoginCardBody";
import LoginCardFooter from "../components/LoginCardFooter";
import Button from "../components/Button";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userForgotPasswordSchema } from "../schemas/user";
import type z from "zod";
import { Link } from "react-router";

type InputsForgotPassword = z.infer<typeof userForgotPasswordSchema>;

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsForgotPassword>({
    resolver: zodResolver(userForgotPasswordSchema),
  });

  function onSubmitForgotPassword(data: InputsForgotPassword) {
    console.log(data);
  }

  return (
    <LoginCard>
      <LoginCardHeader>
        <h1 className="animate-slide-in-from-bottom text-center dark:text-gray-300 text-2xl font-medium">Esqueceu a senha?</h1>
      </LoginCardHeader>
      <LoginCardBody>
        <form onSubmit={handleSubmit(onSubmitForgotPassword)}>
        <p className="animate-slide-in-from-bottom text-center dark:text-gray-300 text-md mb-4">Um email será enviado com as instruções necessárias para redefinir sua senha.</p>
        <fieldset className="flex flex-col gap-4">
          <Input error={errors.email?.message} {...register('email')} className="animate-slide-in-from-bottom" label="Email" type="email" name="email" id="email" />
          <Button className="animate-slide-in-from-bottom justify-center">Enviar</Button>
        </fieldset>
      </form>
      </LoginCardBody>
      <LoginCardFooter>
        <p className="animate-slide-in-from-bottom text-center dark:text-gray-300 text-sm">Lembrou sua senha? <Link to="/login" className="text-primary cursor-pointer hover:text-primary/80 transition-colors">Faça login!</Link></p>
      </LoginCardFooter>
    </LoginCard>
  )
}