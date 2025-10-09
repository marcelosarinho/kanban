import Button from "@components/Button";
import { EnvelopeIcon, SealCheckIcon } from "@phosphor-icons/react";
import LoginCard from "@components/auth/LoginCard";
import LoginCardBody from "@components/auth/LoginCardBody";
import LoginCardHeader from "@components/auth/LoginCardHeader";

export default function VerifyEmail() {
  return (
    <LoginCard>
      <LoginCardHeader>
        <EnvelopeIcon className="mx-auto mb-3 animate-slide-in-from-bottom dark:text-gray-300" size={64} />
        <h1 className="text-center dark:text-gray-300 text-2xl font-medium animate-slide-in-from-bottom">Confirmação de cadastro</h1>
      </LoginCardHeader>
      <LoginCardBody>
        <p className="text-center dark:text-gray-300 text-md animate-slide-in-from-bottom">
          Para verificar seu email e concluir seu cadastro, clique no botão abaixo.
        </p>
        <Button className="animate-slide-in-from-bottom justify-center mx-auto mt-4">
          <SealCheckIcon weight="bold" className="text-lg"/>
          Verificar email
        </Button>
      </LoginCardBody>
    </LoginCard>
  )
}