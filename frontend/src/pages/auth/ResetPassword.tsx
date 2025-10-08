import { verifyResetPassword } from "@api/user";
import Button from "@components/Button";
import Input from "@components/Input";
import Loading from "@components/Loading";
import LoginCard from "@components/auth/LoginCard";
import LoginCardBody from "@components/auth/LoginCardBody";
import LoginCardHeader from "@components/auth/LoginCardHeader";
import { ArrowLeftIcon, XCircleIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<{ loading: boolean, valid: boolean, message: string } | null>(null);

  const navigate = useNavigate();
  const { token, email } = Object.fromEntries(searchParams.entries());

  function renderResetPassword() {
    if (status?.valid) {
      return (
        <LoginCard>
          <LoginCardHeader>
            <h1 className="animate-slide-in-from-bottom text-center dark:text-gray-300 text-2xl font-medium">Redefinir senha</h1>
          </LoginCardHeader>
          <LoginCardBody>
            <form>
              <fieldset className="flex flex-col gap-4">
                <Input className="animate-slide-in-from-bottom" label="Nova senha" type="password" name="password" id="password" isPassword />
                <Input className="animate-slide-in-from-bottom" label="Confirmar nova senha" type="password" name="confirm-password" id="confirm-password" isPassword />
                <Button className="animate-slide-in-from-bottom justify-center">Enviar</Button>
              </fieldset>
            </form>
          </LoginCardBody>
        </LoginCard>
      )
    }

    return (
      <LoginCard>
        <LoginCardHeader>
          <XCircleIcon className="mx-auto mb-3 animate-slide-in-from-bottom text-danger" size={64} />
          <h1 className="animate-slide-in-from-bottom text-center dark:text-gray-300 text-2xl font-medium">Erro ao redefinir senha!</h1>
        </LoginCardHeader>
        <LoginCardBody className="text-center">
          <p className="animate-slide-in-from-bottom dark:text-gray-300 text-md">{status?.message || 'Token inválido!'}</p>
          <p className="animate-slide-in-from-bottom dark:text-gray-300 text-md">Por favor, tente novamente.</p>

          <Link
              to="/auth/login"
              className="mx-auto flex gap-1 w-fit bg-primary text-white px-3 py-2 rounded-md text-sm font-medium mt-6 hover:-translate-y-1 transition"
            >
              <ArrowLeftIcon weight="bold" className="text-lg" />
              Retornar
          </Link>
        </LoginCardBody>
      </LoginCard>
    )
  }

  useEffect(() => {
    if (!token || !email) {
      navigate('/auth/login');
      return;
    }

    async function isValidResetPassword() {
      setStatus({ loading: true, valid: false, message: '' });

      const result = await verifyResetPassword(token, email);

      setStatus({ loading: false, valid: result.valid, message: result.message });
    }

    isValidResetPassword();
  }, []);

  return (
    status?.loading ? (
      <Loading loading={status.loading} className="text-primary text-5xl" />
    ) : (
      renderResetPassword()
    )
  )
}