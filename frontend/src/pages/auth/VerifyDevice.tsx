import LoginCard from "@components/auth/LoginCard";
import LoginCardHeader from "@components/auth/LoginCardHeader";
import { EnvelopeIcon } from "@phosphor-icons/react";
import LoginCardBody from "@components/auth/LoginCardBody";
import Input from "@components/Input";
import Button from "@components/Button";
import { censorEmail } from "@utils/functions";
import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";

export default function VerifyDevice() {
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state) {
    return <Navigate to="/auth/login" replace />;
  }

  const { email, reason } = state;

  const [code, setCode] = useState('');

  return (
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
  )
}