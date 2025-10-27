import { getUser } from "@api/user";
import Button from "@components/Button";
import Dropdown from "@components/dropdown/Dropdown";
import DropdownOption from "@components/dropdown/DropdownOption";
import Input from "@components/Input";
import Navbar from "@components/navbar/Navbar";
import NavbarButton from "@components/navbar/NavbarButton";
import ProfileCard from "@components/profile/ProfileCard";
import ProfileCardBody from "@components/profile/ProfileCardBody";
import ProfileCardHeader from "@components/profile/ProfileCardHeader";
import ThemeIcon from "@components/theme/ThemeIcon";
import { useTheme } from "@contexts/ThemeContext";
import { CheckIcon, KanbanIcon, TrashIcon, UserIcon, WarningIcon } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link } from "react-router";

export default function Profile() {
  const { theme, changeTheme } = useTheme();

  const [dropdown, setDropdown] = useState({
    theme: false,
  });

  const {
    isPending,
    isError,
    data,
  } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(),
  });

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: data?.data.name,
      email: data?.data.email,
    },
  });

  return (
    <>
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
      <div className="flex flex-col items-center pt-20 pb-8 h-full gap-6">
        <section className="flex gap-5 items-center">
          <div className="dark:bg-slate-700 rounded-full p-3">
            <UserIcon className="dark:text-gray-300" size={40} />
          </div>
          <div>
            <h1 className="text-2xl font-bold dark:text-gray-300 mb-2">Seu perfil</h1>
            <h6 className="text-md text-gray-500 dark:text-gray-400">Gerencie as informações e preferências de seu perfil</h6>
          </div>
        </section>

        <section className="w-full xl:max-w-xl lg:max-w-lg md:max-w-md sm:max-w-sm max-w-sm">
          <ProfileCard>
            <ProfileCardHeader>
              <h1 className="text-md font-medium dark:text-gray-300 mb-1">Informações do perfil</h1>
              <h6 className="text-sm text-gray-500 dark:text-gray-400">Atualize suas informações pessoais e endereço de email.</h6>
            </ProfileCardHeader>
            <ProfileCardBody>
              <form onSubmit={handleSubmit()}>
                <fieldset className="flex flex-col gap-3">
                  <Input {...register('name')} label="Nome" name="name" id="name" type="text" />
                  <Input {...register('email')} label="Email" name="email" id="email" type="email" />
                  <Button className="justify-center md:w-fit">
                    <CheckIcon weight="bold" className="text-lg" />
                    Salvar alterações
                  </Button>
                </fieldset>
              </form>
            </ProfileCardBody>
          </ProfileCard>
        </section>

        <section className="w-full xl:max-w-xl lg:max-w-lg md:max-w-md sm:max-w-sm max-w-sm">
          <ProfileCard>
            <ProfileCardHeader>
              <h1 className="text-md font-medium dark:text-gray-300 mb-1">Alterar senha</h1>
              <h6 className="text-sm text-gray-500 dark:text-gray-400">Atualize sua senha para manter sua conta segura.</h6>
            </ProfileCardHeader>
            <ProfileCardBody>
            <form>
              <fieldset className="flex flex-col gap-3">
                <Input label="Senha atual" name="password" id="password" type="password" placeholder="Digite sua senha atual" isPassword />
                <Input label="Nova senha" name="newPassword" id="newPassword" type="password" placeholder="Digite sua nova senha" isPassword />
                <Input label="Confirmar nova senha" name="confirmNewPassword" id="confirmNewPassword" type="password" placeholder="Confirme sua nova senha" isPassword />
                <Button className="justify-center md:w-fit">
                  <CheckIcon weight="bold" className="text-lg" />
                  Salvar alterações
                </Button>
              </fieldset>
            </form>
            </ProfileCardBody>
          </ProfileCard>
        </section>

        <section className="w-full xl:max-w-xl lg:max-w-lg md:max-w-md sm:max-w-sm max-w-sm">
          <ProfileCard className="border-danger!">
            <ProfileCardHeader>
              <span className="inline-flex items-center gap-2">
                <WarningIcon className="text-danger" size={20}/>
                <h1 className="text-md font-medium text-danger">Área de perigo</h1>
              </span>
              <h6 className="text-sm text-gray-500 dark:text-gray-400">Ações irreversíveis que afetarão permanentemente sua conta.</h6>
            </ProfileCardHeader>

            <ProfileCardBody>
              <div className="flex flex-col md:flex-row justify-between items-center gap-3 mt-8">
                <div>
                  <h1 className="text-md font-medium dark:text-gray-300 mb-1">Apagar conta</h1>
                  <h6 className="text-sm text-gray-500 dark:text-gray-400">Assim que apagar sua conta, não poderá ser recuperada. Tenha certeza!</h6>
                </div>

                <Button variant="danger" className="whitespace-nowrap w-full md:w-fit">
                  <TrashIcon weight="bold" className="text-white text-lg" />
                  Apagar conta
                </Button>
              </div>
            </ProfileCardBody>
          </ProfileCard>
        </section>
      </div>
    </>
  )
}