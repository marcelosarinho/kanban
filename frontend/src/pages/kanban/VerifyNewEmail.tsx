import Navbar from "@components/navbar/Navbar";
import NavbarButton from "@components/navbar/NavbarButton";
import ThemeIcon from "@components/theme/ThemeIcon";
import { Link, useSearchParams } from "react-router";
import Dropdown from "@components/dropdown/Dropdown";
import DropdownOption from "@components/dropdown/DropdownOption";
import { EnvelopeIcon, KanbanIcon, SealCheckIcon } from "@phosphor-icons/react";
import { useTheme } from "@contexts/ThemeContext";
import { useState } from "react";
import { useNavigate } from "react-router";
import Button from "@components/button/Button";
import LoginCard from "@components/auth/LoginCard";
import LoginCardHeader from "@components/auth/LoginCardHeader";
import LoginCardBody from "@components/auth/LoginCardBody";
import { verifyNewEmail } from "@api/user";
import { useMutation } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";

export default function VerifyNewEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { email, token } = Object.fromEntries(searchParams.entries());

  const { theme, changeTheme } = useTheme();
  
  const [dropdown, setDropdown] = useState({
    theme: false,
  });

  const verifyEmailMutation = useMutation({
    mutationFn: () => verifyNewEmail({ email, token }),
    onSuccess: () => {
      toast.success('Novo email verificado com sucesso!');
      toast.success('Redirecionando para a tela do kanban...');

      setTimeout(() => {
        navigate('/kanban');
      }, 3000);
    },
    onError: () => {
      toast.error('Erro ao verificar o novo email!');
    },
  });

  return (
    <>
      <Toaster
        position='bottom-right'
        toastOptions={{
          success: {
            iconTheme: {
              primary: 'var(--color-success)',
              secondary: 'black',
            }
          },
          error: {
            iconTheme: {
              primary: 'var(--color-danger)',
              secondary: 'white',
            }
          },
          className: 'react-hot-toast',
          duration: 3000,
        }}
      />

      <Navbar className="left-0">
        <NavbarButton onClick={() => setDropdown({ ...dropdown, theme: !dropdown.theme })}>
          <ThemeIcon theme={theme} size="lg" />
        </NavbarButton>
        <NavbarButton>
          <Link to="/kanban">
            <KanbanIcon className="text-2xl dark:text-gray-300" />
          </Link>
        </NavbarButton>
        {dropdown.theme && (
          <Dropdown className="right-12 top-10">
            <DropdownOption onClick={() => changeTheme('dark')}>
              <ThemeIcon theme="dark" />
              Escuro
            </DropdownOption>
            <DropdownOption onClick={() => changeTheme('light')}>
              <ThemeIcon theme="light" />
              Claro
            </DropdownOption>
            <DropdownOption onClick={() => changeTheme('system')}>
              <ThemeIcon theme="system" />
              Sistema
            </DropdownOption>
          </Dropdown>
        )}
      </Navbar>

      <div className="flex items-center justify-center h-screen">
        <LoginCard>
          <LoginCardHeader>
            <EnvelopeIcon className="mx-auto mb-3 animate-slide-in-from-bottom dark:text-gray-300" size={64} />
            <h1 className="text-center dark:text-gray-300 text-2xl font-medium animate-slide-in-from-bottom">Confirmação de novo email</h1>
          </LoginCardHeader>
          <LoginCardBody>
            <p className="text-center dark:text-gray-300 text-md animate-slide-in-from-bottom">
              Para verificar o novo email de sua conta, clique no botão abaixo.
            </p>
            <Button
              loading={verifyEmailMutation.isPending}
              className="animate-slide-in-from-bottom justify-center mx-auto mt-4"
              onClick={() => verifyEmailMutation.mutate()}
              icon={SealCheckIcon}
              iconClassName="text-lg"
            >
              Verificar email
            </Button>
          </LoginCardBody>
        </LoginCard>
      </div>
    </>
  )
}