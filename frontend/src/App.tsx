import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import Button from './components/Button';
import Modal from './components/Modal';
import ModalHeader from './components/ModalHeader';
import ModalTitle from './components/ModalTitle';
import ModalClose from './components/ModalClose';
import ModalBody from './components/ModalBody';
import ModalFooter from './components/ModalFooter';
import Input from './components/Input';
import Textarea from './components/Textarea';
import SidebarCard from './components/SidebarCard';
import CategoryBadge from './components/CategoryBadge';
import { ArrowsOutIcon, MoonIcon, MoonStarsIcon, PlusIcon, SunIcon } from '@phosphor-icons/react';
import Searchbar from './components/Searchbar';
import { CATEGORIES, TASK_STATUSES } from './libs/constants';
import StatusColumn from './components/StatusColumn';
import SidebarCardSkeleton from './components/SidebarCardSkeleton';
import TaskSkeleton from './components/TaskSkeleton';
import Task from './components/Task';
import { useForm } from 'react-hook-form';
import type z from 'zod';
import { projectSchema } from './schemas/projects';
import { zodResolver } from '@hookform/resolvers/zod';

const themeIcons: { [key: string]: string } = {
  light: 'ph-sun',
  dark: 'ph-moon',
  system: 'ph-moon-stars',
}

type Inputs = z.infer<typeof projectSchema>;

function App() {
  const [themeDropdown, setThemeDropdown] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const themeIconRef = useRef<HTMLElement>(null);

  const disabledCategories = selectedCategories.length >= 2;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(projectSchema),
  });

  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      return;
    }

    if (document.exitFullscreen) {
      document.exitFullscreen();
      return;
    }
  }

  function toggleThemeDropdown() {
    setThemeDropdown(!themeDropdown);
  }

  function changeTheme(selectedTheme: string) {
    changeIconTheme(themeIcons[selectedTheme]);

    if (selectedTheme === 'dark' || selectedTheme === 'light') {
      localStorage.setItem('theme', selectedTheme);
      document.documentElement.classList.toggle('dark', selectedTheme === 'dark');
      return;
    }

    localStorage.removeItem('theme');
    document.documentElement.classList.toggle('dark', window.matchMedia("(prefers-color-scheme: dark)").matches);
  }

  function changeIconTheme(icon: string) {
    const iconElement = themeIconRef.current;

    iconElement?.classList.remove('ph-sun', 'ph-moon', 'ph-moon-stars');
    iconElement?.classList.add(icon);
  }

  function openModal(id: string) {
    const modal = document.getElementById(id) as HTMLDialogElement;

    if (modal) {
      modal.show();
    }
  }

  function closeModal(id: string) {
    const modal = document.getElementById(id) as HTMLDialogElement;

    if (modal) {
      modal.close();
    }
  }

  function handleCategoryToggle(e: ChangeEvent<HTMLInputElement>) {
    const isCategoryChecked = e.target.checked;
    const name = e.target.name;

    if (isCategoryChecked) {
      setSelectedCategories([...selectedCategories, name]);
      return;
    }

    setSelectedCategories(selectedCategories.filter(category => category !== name));
  }

  function onSubmit() {
    console.log('submit');
  }

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    
    changeIconTheme(themeIcons[theme || 'system']);

    document.documentElement.classList.toggle('dark', theme === 'dark' || !theme && window.matchMedia("(prefers-color-scheme: dark)").matches);
  }, []);

  return (
    <>
      <Modal id="create-project-modal">
        <ModalHeader>
          <ModalTitle>Adicionar projeto</ModalTitle>
          <ModalClose onClick={() => closeModal('create-project-modal')} />
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)} id="create-project-form" className="flex flex-col gap-3">
            <Input error={errors.name?.message} {...register('name')} id="project-name" label="Nome do projeto"/>

            <Textarea error={errors.description?.message} {...register('description')} id="project-description" label="Descrição do projeto"/>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button form="create-project-form">Salvar</Button>
          <Button onClick={() => closeModal('create-project-modal')} variant="outline-primary">Cancelar</Button>
        </ModalFooter>
      </Modal>

      <Modal id="select-category-modal">
        <ModalHeader>
          <ModalTitle>Selecionar categorias</ModalTitle>
          <ModalClose onClick={() => closeModal('select-category-modal')} />
        </ModalHeader>
        <ModalBody>
          <form className="flex flex-col gap-3">
            <div className="flex gap-3">
              {Object.keys(CATEGORIES).map((category) => (
                <CategoryBadge
                  key={category}
                  disabled={disabledCategories && !selectedCategories.includes(category)}
                  onChange={handleCategoryToggle}
                  category={category as keyof typeof CATEGORIES}
                  name={category}
                />
              ))}
            </div>
          </form>
        </ModalBody>
      </Modal>

      <aside className="fixed w-52 bg-white h-full border-r border-gray-300 dark:bg-slate-900 dark:border-slate-700">
        <div className="flex flex-col items-center px-2">
          <h3 className="text-xl font-semibold text-center mb-4 mt-2 dark:text-gray-300">Projetos</h3>
          <Button type="button" onClick={() => openModal('create-project-modal')}>
            <PlusIcon weight="bold" className="text-lg" />
            Adicionar projeto
          </Button>

          <Searchbar className="mt-6" />
          <div className="mt-4 flex flex-col w-full gap-3 overflow-y-auto max-h-screen">
            <SidebarCard name="Projeto" description="Descrição" />
            <SidebarCardSkeleton />
            <SidebarCardSkeleton />
            <SidebarCardSkeleton />
            <SidebarCardSkeleton />
            <SidebarCardSkeleton />
            <SidebarCardSkeleton />
            <SidebarCardSkeleton />
            <SidebarCardSkeleton />
            <SidebarCardSkeleton />
            <SidebarCardSkeleton />
          </div>
        </div>
      </aside>
      <section className="ml-52">
        <nav
          className="z-[1] fixed h-12 bg-white flex justify-end px-4 py-7 gap-3 items-center left-52 right-0 border-b border-gray-300 dark:bg-slate-900 dark:border-slate-700"
        >
          <button onClick={toggleThemeDropdown} className="flex items-center justify-center cursor-pointer hover:bg-gray-200 dark:hover:bg-slate-800 rounded-full p-1">
            <i ref={themeIconRef} className="ph ph-sun text-2xl dark:text-gray-300"></i>
          </button>
          <button onClick={toggleFullScreen} className="flex items-center justify-center cursor-pointer hover:bg-gray-200 dark:hover:bg-slate-800 rounded-full p-1">
            <ArrowsOutIcon className="text-2xl dark:text-gray-300" />
          </button>
          {themeDropdown && (
            <div className="absolute right-12 top-10 bg-white rounded-md mt-2 p-2 w-28 text-sm border border-gray-300 dark:bg-slate-900 dark:border-slate-700 dark:text-gray-300 select-none">
              <div onClick={() => changeTheme('dark')} className="rounded px-2 py-1 flex items-center hover:bg-gray-100 cursor-pointer dark:hover:bg-slate-800">
                <MoonIcon className="mr-2 text-xl" />
                Escuro
              </div>
              <div onClick={() => changeTheme('light')} className="rounded px-2 py-1 flex items-center hover:bg-gray-100 cursor-pointer dark:hover:bg-slate-800">
                <SunIcon className="mr-2 text-xl" />
                Claro
              </div>
              <div onClick={() => changeTheme('system')} className="rounded px-2 py-1 flex items-center hover:bg-gray-100 cursor-pointer dark:hover:bg-slate-800">
                <MoonStarsIcon className="mr-2 text-xl" />
                Sistema
              </div>
            </div>
          )}
        </nav>

        <main className="flex flex-col items-center justify-center px-6 pt-20 dark:bg-slate-950 bg-gray-50">
          <header className='text-center'>
            <h1 className="text-3xl font-bold mb-2 dark:text-gray-300">
              Kanban
            </h1>

            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis, et.</p>
          </header>

          <div className="flex gap-4">
            {Object.keys(TASK_STATUSES).map((key) => (
              <StatusColumn key={key} status={key as keyof typeof TASK_STATUSES}>
                <Task onClick={() => openModal('select-category-modal')} />
                <TaskSkeleton />
              </StatusColumn>
            ))}
          </div>
        </main>
      </section>
    </>
  )
}

export default App
