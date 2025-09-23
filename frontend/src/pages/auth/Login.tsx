import Button from "@components/Button";
import Input from "@components/Input";
import { userLoginSchema } from "@schemas/user";
import type z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import UserFormMessage from "@components/auth/UserFormMessage";
import { censorEmail } from "@utils/functions";
import LoginCardBody from "@components/auth/LoginCardBody";
import LoginCardHeader from "@components/auth/LoginCardHeader";
import LoginCard from "@components/auth/LoginCard";
import LoginCardFooter from "@components/auth/LoginCardFooter";
import { Link } from "react-router";

type InputsLogin = z.infer<typeof userLoginSchema>;

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsLogin>({
    resolver: zodResolver(userLoginSchema),
  })

  function onSubmitLogin(data: InputsLogin) {
    console.log(censorEmail(data.email));
  }

  return (
    <LoginCard>
      <LoginCardHeader>
        <h1 className="animate-slide-in-from-bottom text-center dark:text-gray-300 text-2xl font-medium">Login</h1>
      </LoginCardHeader>
      <LoginCardBody>
        <form onSubmit={handleSubmit(onSubmitLogin)}>
          <fieldset className="flex flex-col gap-4">
            <UserFormMessage variant="success" message="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis rerum quisquam quam incidunt repellat. Quis soluta, quas commodi accusamus excepturi aspernatur, quod recusandae perferendis error nesciunt voluptatibus omnis dolorem nostrum eius, odio porro suscipit hic animi repellat aliquid eaque? Quo expedita eligendi rerum sed consequuntur aliquid, odit repellat recusandae tenetur?" />
            <Input error={errors.email?.message} {...register('email')} className="animate-slide-in-from-bottom" label="Email" type="email" name="email" id="email" />
            <Input error={errors.password?.message} {...register('password')} className="animate-slide-in-from-bottom" label="Senha" type="password" name="password" id="password" isPassword />
            <Link to="/auth/forgot-password" className="animate-slide-in-from-bottom text-sm text-primary cursor-pointer hover:text-primary/80 transition-colors">
              Esqueceu sua senha?
            </Link>
            <Button className="animate-slide-in-from-bottom justify-center">Entrar</Button>
          </fieldset>
        </form>
      </LoginCardBody>
      <LoginCardFooter>
        <p className="animate-slide-in-from-bottom text-center dark:text-gray-300 text-sm">Não tem conta? <Link to="/auth/sign-up" className="text-primary cursor-pointer hover:text-primary/80 transition-colors">Cadastre-se de graça!</Link></p>
      </LoginCardFooter>
    </LoginCard>
  )
}