import Button from "@components/button/Button";
import { EnvelopeIcon, SealCheckIcon } from "@phosphor-icons/react";
import LoginCard from "@components/auth/LoginCard";
import LoginCardBody from "@components/auth/LoginCardBody";
import LoginCardHeader from "@components/auth/LoginCardHeader";
import { useMutation } from "@tanstack/react-query";
import { verifyEmail } from "@api/user";
import { useNavigate, useSearchParams } from "react-router";
import UserFormMessage from "@components/auth/UserFormMessage";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { email, token } = Object.fromEntries(searchParams.entries());

  const verifyEmailMutation = useMutation({
    mutationFn: verifyEmail,
    onSuccess: () => {
      setTimeout(() => {
        navigate('/auth/login');
      }, 3000);
    }
  })

  return (
    <LoginCard>
      <LoginCardHeader>
        <EnvelopeIcon className="mx-auto mb-3 animate-slide-in-from-bottom dark:text-gray-300" size={64} />
        <h1 className="text-center dark:text-gray-300 text-2xl font-medium animate-slide-in-from-bottom">Confirmação de cadastro</h1>
      </LoginCardHeader>
      <LoginCardBody>
        {verifyEmailMutation.isSuccess && (
          <UserFormMessage className="mb-3" variant="success" message="Email verificado com sucesso! Redirecionando para a tela de login..." />
        )}
        {verifyEmailMutation.isError && (
          <UserFormMessage className="mb-3" variant="error" message={verifyEmailMutation.error?.message} />
        )}
        <p className="text-center dark:text-gray-300 text-md animate-slide-in-from-bottom">
          Para verificar seu email e concluir seu cadastro, clique no botão abaixo.
        </p>
        <Button
          loading={verifyEmailMutation.isPending}
          className="animate-slide-in-from-bottom justify-center mx-auto mt-4"
          onClick={() => verifyEmailMutation.mutate({ email, token })}
          icon={SealCheckIcon}
          iconClassName="text-lg"
        >
          Verificar email
        </Button>
      </LoginCardBody>
    </LoginCard>
  )
}