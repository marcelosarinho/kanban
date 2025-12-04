import { deleteUser, getUser } from "@api/user";
import Button from "@components/button/Button";
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
import { CheckIcon, KanbanIcon, TrashIcon, UserIcon, WarningIcon, XIcon } from "@phosphor-icons/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import ProfileInfoSkeleton from "@components/skeleton/ProfileInfoSkeleton";
import ProfilePasswordSkeleton from "@components/skeleton/ProfilePasswordSkeleton";
import ProfileDeleteSkeleton from "@components/skeleton/ProfileDeleteSkeleton";
import Modal from "@components/modal/Modal";
import ModalFooter from "@components/modal/ModalFooter";
import ModalHeader from "@components/modal/ModalHeader";
import ModalTitle from "@components/modal/ModalTitle";
import ModalClose from "@components/modal/ModalClose";
import ModalBody from "@components/modal/ModalBody";
import { closeModal, openModal } from "@utils/modal";
import type z from "zod";
import { profileInfoSchema, profilePasswordSchema } from "@schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfile as updateProfileFn, updatePassword as updatePasswordFn } from "@api/user";
import toast, { Toaster } from "react-hot-toast";
import { useGoodbye } from "@contexts/GoodbyeContext";

type ProfileInputs = z.infer<typeof profileInfoSchema>;
type PasswordInputs = z.infer<typeof profilePasswordSchema>;

export default function Profile() {
  const navigate = useNavigate();

  const { theme, changeTheme } = useTheme();
  const { setGoodbyeToken } = useGoodbye();

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

  const updateProfileMutation = useMutation({
    mutationFn: updateProfileFn,
    onSuccess: (data) => {
      toast.success('Perfil atualizado com sucesso!');

      if (data?.data?.pendingEmail) {
        toast.success(`Email de confirmação enviado para: ${data.data.pendingEmail}`, {
          duration: 10000,
        });
      }
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  const updatePasswordMutation = useMutation({
    mutationFn: updatePasswordFn,
    onSuccess: () => {
      toast.success('Senha atualizada com sucesso!');
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: (data) => {
      toast.success('Conta deletada com sucesso!');
      toast.success('Redirecionando para a página de despedida...');

      if (data?.data?.token) {
        setGoodbyeToken(data.data.token);
      }

      setTimeout(() => {
        navigate('/goodbye');
      }, 3000);
    },
    onError: () => {
      toast.error('Erro ao deletar usuário!');
    }
  })

  const {
    register: updateProfile,
    handleSubmit: updateProfileSubmit,
    reset,
    formState: { errors: updateProfileErrors },
  } = useForm<ProfileInputs>({
    resolver: zodResolver(profileInfoSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  });

  const {
    register: updatePassword,
    handleSubmit: updatePasswordSubmit,
    formState: { errors: updatePasswordErrors },
  } = useForm<PasswordInputs>({
    resolver: zodResolver(profilePasswordSchema),
  });

  useEffect(() => {
    if (data) {
      reset({
        name: data.data.name,
        email: data.data.email,
      });
    }
  }, [data, reset]);

  function onSubmit(type: 'profile' | 'password', data: ProfileInputs | PasswordInputs) {
    if (type === 'profile') {
      updateProfileMutation.mutate({
        name: (data as ProfileInputs).name,
        email: (data as ProfileInputs).email,
      });
    }

    if (type === 'password') {
      updatePasswordMutation.mutate({
        oldPassword: (data as PasswordInputs).password,
        newPassword: (data as PasswordInputs).new_password,
        confirmPassword: (data as PasswordInputs).new_password_confirmation,
      });
    }
  }

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

      <Modal id="delete-account-modal">
        <ModalHeader>
          <ModalTitle>Apagar conta</ModalTitle>
          <ModalClose onClick={() => closeModal('delete-account-modal')} />
        </ModalHeader>
        <ModalBody>
          <p>Essa é uma ação irreversível, ao apagar sua conta, todos os seus projetos e dados serão perdidos. Tem certeza que deseja continuar?</p>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => deleteUserMutation.mutate()}
            className="w-full justify-center sm:w-auto"
            loading={deleteUserMutation.isPending}
            variant="primary"
            icon={TrashIcon}
            iconClassName="text-lg"
          >
            Apagar
          </Button>
          <Button
            onClick={() => closeModal('delete-account-modal')}
            className="w-full justify-center sm:w-auto"
            variant="outline-primary"
            icon={XIcon}
            iconClassName="text-lg"
          >
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>

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

      {isPending ? (
        <div className="flex flex-col items-center pt-20 pb-8 h-full gap-6">
          <section className="flex gap-5 items-center w-full xl:max-w-xl lg:max-w-lg md:max-w-md sm:max-w-sm max-w-sm">
            <div className="bg-white dark:bg-slate-700 rounded-full p-3">
              <UserIcon className="dark:text-gray-300" size={40} />
            </div>
            <div>
              <h1 className="text-2xl font-bold dark:text-gray-300 mb-2">Seu perfil</h1>
              <h6 className="text-md text-gray-500 dark:text-gray-400">Gerencie as informações e preferências de seu perfil</h6>
            </div>
          </section>
          
          <section className="w-full xl:max-w-xl lg:max-w-lg md:max-w-md sm:max-w-sm max-w-sm">
            <ProfileInfoSkeleton/>
          </section>

          <section className="w-full xl:max-w-xl lg:max-w-lg md:max-w-md sm:max-w-sm max-w-sm">
            <ProfilePasswordSkeleton />
          </section>

          <section className="w-full xl:max-w-xl lg:max-w-lg md:max-w-md sm:max-w-sm max-w-sm">
            <ProfileDeleteSkeleton />
          </section>
        </div>
      ) : (
        <div className="flex flex-col items-center pt-20 pb-8 h-full gap-6">
          <section className="flex gap-5 items-center w-full xl:max-w-xl lg:max-w-lg md:max-w-md sm:max-w-sm max-w-sm">
            <div className="bg-white dark:bg-slate-700 rounded-full p-3">
              <UserIcon className="dark:text-gray-300" size={40} />
            </div>
            <div>
              <h1 className="text-2xl font-bold dark:text-gray-300 mb-2">Seu perfil</h1>
              <h6 className="text-md text-gray-500 dark:text-gray-400">Gerencie as informações e preferências de seu perfil</h6>
            </div>
          </section>

          {isError && (
            <section className="w-full xl:max-w-xl lg:max-w-lg md:max-w-md sm:max-w-sm max-w-sm bg-danger/20 border-danger text-red-800 dark:text-red-400 p-2 border text-sm rounded animate-in">
              <p>Erro ao carregar informações do perfil!</p>
            </section>
          )}

          <section className="w-full xl:max-w-xl lg:max-w-lg md:max-w-md sm:max-w-sm max-w-sm">
            <ProfileCard>
              <ProfileCardHeader>
                <h1 className="text-md font-medium dark:text-gray-300 mb-1">Informações do perfil</h1>
                <h6 className="text-sm text-gray-500 dark:text-gray-400">Atualize suas informações pessoais e endereço de email.</h6>
              </ProfileCardHeader>
              <ProfileCardBody>
                <form onSubmit={updateProfileSubmit((data) => onSubmit('profile', data))}>
                  <fieldset className="flex flex-col gap-3">
                    <Input disabled={isError || updateProfileMutation.isPending} error={updateProfileErrors.name?.message} {...updateProfile('name')} label="Nome" name="name" id="name" type="text" />
                    <Input disabled={isError || updateProfileMutation.isPending} error={updateProfileErrors.email?.message} {...updateProfile('email')} label="Email" name="email" id="email" type="email" />
                    <Button
                      disabledOnError={isError}
                      loading={updateProfileMutation.isPending}
                      icon={CheckIcon}
                      iconClassName="text-lg"
                      className="justify-center md:w-fit"
                    >
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
              <form onSubmit={updatePasswordSubmit((data) => onSubmit('password', data))}>
                <fieldset className="flex flex-col gap-3">
                  <Input disabled={isError || updatePasswordMutation.isPending} error={updatePasswordErrors.password?.message} {...updatePassword('password')} label="Senha atual" name="password" id="password" type="password" placeholder="Digite sua senha atual" isPassword />
                  <Input disabled={isError || updatePasswordMutation.isPending} error={updatePasswordErrors.new_password?.message} {...updatePassword('new_password')} label="Nova senha" name="new_password" id="new_password" type="password" placeholder="Digite sua nova senha" isPassword />
                  <Input disabled={isError || updatePasswordMutation.isPending} error={updatePasswordErrors.new_password_confirmation?.message} {...updatePassword('new_password_confirmation')} label="Confirmar nova senha" name="new_password_confirmation" id="new_password_confirmation" type="password" placeholder="Confirme sua nova senha" isPassword />
                  <Button
                    disabledOnError={isError}
                    loading={updatePasswordMutation.isPending}
                    icon={CheckIcon}
                    iconClassName="text-lg"
                    className="justify-center md:w-fit"
                  >
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
                    <h6 className="text-sm text-gray-500 dark:text-gray-400">Assim que apagar sua conta, ela não poderá ser recuperada. Tenha certeza!</h6>
                  </div>

                  <Button
                    disabledOnError={isError}
                    loading={deleteUserMutation.isPending}
                    onClick={() => openModal('delete-account-modal')}
                    variant="danger"
                    icon={TrashIcon}
                    iconClassName="text-lg"
                    className="whitespace-nowrap justify-center w-full md:w-fit"
                  >
                    Apagar conta
                  </Button>
                </div>
              </ProfileCardBody>
            </ProfileCard>
          </section>
        </div>
      )}
    </>
  )
}