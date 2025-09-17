import { useEffect, useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { userLoginSchema } from "../schemas/user";
import type z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import UserFormMessage from "../components/UserFormMessage";
import { censorEmail } from "../utils/functions";
import LoginCardBody from "../components/LoginCardBody";
import LoginCardHeader from "../components/LoginCardHeader";
import LoginCard from "../components/LoginCard";
import LoginCardFooter from "../components/LoginCardFooter";
import { Link } from "react-router";

type FormType = 'login' | 'forgot-password' | 'confirm-login';

type InputsLogin = z.infer<typeof userLoginSchema>;

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

  function onSubmitLogin(data: InputsLogin) {
    setFormType('confirm-login');
    console.log(censorEmail(email));
  }

  const email = watchLogin('email');

  return (
    <>
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
            <p className="animate-slide-in-from-bottom text-center dark:text-gray-300 text-sm">Não tem conta? <Link to="/sign-up" className="text-primary cursor-pointer hover:text-primary/80 transition-colors">Cadastre-se de graça!</Link></p>
          </LoginCardFooter>
        </LoginCard>
      )}
    </>
  )
}