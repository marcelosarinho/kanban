import LoginCard from "@components/auth/LoginCard";
import LoginCardHeader from "@components/auth/LoginCardHeader";
import { DevicesIcon } from "@phosphor-icons/react";
import LoginCardBody from "@components/auth/LoginCardBody";
import Input from "@components/Input";
import Button from "@components/Button";
import { censorEmail } from "@utils/functions";
import { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import type z from "zod";
import { userVerifyDevice } from "@schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { verifyDevice } from "@api/user";

type Inputs = z.infer<typeof userVerifyDevice>;

export default function VerifyDevice() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const email = state?.email;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: zodResolver(userVerifyDevice),
  });

  const verifyDeviceMutation = useMutation({
    mutationFn: verifyDevice,
    onSuccess: () => {
      console.log('foi');
    }
  })

  const code = watch('code');
  setValue('email', email);

  useEffect(() => {
    if (code && code.length === 6) {
      handleSubmit(onSubmit)();
    }
  }, [code, handleSubmit]);

  function onSubmit(data: Inputs) {
    verifyDeviceMutation.mutate(data);
  }

  if (!email) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <LoginCard>
      <LoginCardHeader>
        <DevicesIcon className="mx-auto mb-3 animate-slide-in-from-bottom dark:text-gray-300" size={64} />
        <h1 className="text-center dark:text-gray-300 text-2xl font-medium animate-slide-in-from-bottom">
          Verificação de dispositivo
        </h1>
      </LoginCardHeader>
      <LoginCardBody>
        <p className="text-center dark:text-gray-300 text-md animate-slide-in-from-bottom">
          Você está fazendo login em um novo dispositivo. Para sua segurança, verifique o login confirmando o código enviado para o email {censorEmail(email)}.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
          <fieldset>
            <Input error={errors.code?.message} {...register('code')} className="animate-slide-in-from-bottom mb-4" id="code" label="Código de verificação" placeholder="XXXXXX" maxLength={6} />
            <Button className="animate-slide-in-from-bottom justify-center w-full">Verificar</Button>
          </fieldset>
        </form>
      </LoginCardBody>
    </LoginCard>
  )
}