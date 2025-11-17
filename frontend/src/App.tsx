import React, { useDeferredValue, useEffect, useState, type ChangeEvent } from 'react';
import Button from '@components/button/Button';
import Modal from '@components/modal/Modal';
import ModalHeader from '@components/modal/ModalHeader';
import ModalTitle from '@components/modal/ModalTitle';
import ModalClose from '@components/modal/ModalClose';
import ModalBody from '@components/modal/ModalBody';
import ModalFooter from '@components/modal/ModalFooter';
import Input from '@components/Input';
import Textarea from '@components/Textarea';
import Project from '@components/project/Project';
import CategoryBadge from '@components/badge/CategoryBadge';
import { ArrowsOutIcon, MoonIcon, MoonStarsIcon, PlusIcon, SunIcon } from '@phosphor-icons/react';
import Searchbar from '@components/Searchbar';
import { CATEGORIES, TASK_STATUSES } from '@libs/constants';
import TaskStatus from '@components/task/TaskStatus';
import ProjectSkeleton from '@components/skeleton/ProjectSkeleton';
import TaskSkeleton from '@components/skeleton/TaskSkeleton';
import Task from '@components/task/Task';
import { useForm } from 'react-hook-form';
import type z from 'zod';
import { projectSchema } from '@schemas/project';
import { zodResolver } from '@hookform/resolvers/zod';
import toast, { Toaster } from 'react-hot-toast';
import type { Project as ProjectType } from '@custom-types/project';
import { QueryClient, QueryClientProvider, useMutation, useQuery } from '@tanstack/react-query';
import { createProject, deleteProject, getProjects, updateProject, createTask, getTasks } from '@api/index';
import Loading from '@components/Loading';
import TaskStatusSkeleton from '@components/skeleton/TaskStatusSkeleton';
import type { Task as TaskType, TaskStatusOption } from '@custom-types/task';
import { MAX_CATEGORIES_LENGTH } from '@libs/constants';
import { getCookie, setCookie } from '@utils/functions';
import type { ThemeOption } from '@custom-types/constants';

const themeIcons: Record<string, React.ElementType> = {
  light: SunIcon,
  dark: MoonIcon,
  system: MoonStarsIcon,
}

type Inputs = z.infer<typeof projectSchema>;
const queryClient = new QueryClient();

function App() {
  const [themeDropdown, setThemeDropdown] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [project, setProject] = useState<ProjectType | null>(null);
  const [projectsQuery, setProjectsQuery] = useState('');
  const [tasksQuery, setTasksQuery] = useState({
    todo: '',
    in_progress: '',
    testing: '',
    implemented: '',
  });
  const [initialLoading, setInitialLoading] = useState(true);

  const deferredProjectsQuery = useDeferredValue(projectsQuery);
  const deferredTasksQuery = useDeferredValue(tasksQuery);

  const disabledCategories = selectedCategories.length >= MAX_CATEGORIES_LENGTH;

  const theme = getCookie('theme');
  document.documentElement.classList.toggle('dark', theme === 'dark' || !theme && window.matchMedia("(prefers-color-scheme: dark)").matches);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
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

  function changeTheme(selectedTheme: ThemeOption) {
    setCookie('theme', selectedTheme);
    document.documentElement.classList.toggle('dark', selectedTheme === 'dark');
  }

  function renderThemeIcon() {
    const Icon = themeIcons[theme ?? 'system'];
    return <Icon className="mr-2 text-xl" />
  }

  function openModal(id: string, project?: ProjectType, edit?: boolean) {
    const modal = document.getElementById(id) as HTMLDialogElement;

    if (project) {
      setProject(project);

      if (edit) {
        setValue('name', project.name);
        setValue('description', project.description);
      }
    }

    if (modal) {
      modal.show();
    }
  }

  function closeModal(id: string) {
    const modal = document.getElementById(id) as HTMLDialogElement;
    setProject(null);
    resetForm();

    if (modal) {
      modal.close();
    }
  }

  function resetForm() {
    setValue('name', '');
    setValue('description', '');
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

  function renderProjects() {
    if (!initialLoading && isPendingProjects) {
      return (
        <div className="flex items-start justify-center h-screen">
          <Loading className='font-bold text-3xl text-primary' loading={isPendingProjects} />
        </div>
      )
    }

    if (initialLoading) {
      return (
        <>
          {Array.from({ length: 4 }).map((_, index) => (
            <ProjectSkeleton key={index} />
          ))}
        </>
      )
    }

    return projects?.map((p: ProjectType) => (
      <Project
        key={p.id}
        project={p}
        openModal={openModal}
        selected={p.id === project?.id}
        onClick={() => setProject(p)}
      />
    ))
  }

  function renderProjectHeader() {
    if (initialLoading) {
      return (
        <header className="flex flex-col items-center w-full">
          <div className="bg-gray-300 dark:bg-slate-600 h-9 rounded-full mb-3 animate-pulse w-1/3"></div>
          <div className="bg-gray-300 dark:bg-slate-600 h-5 rounded-full animate-pulse w-1/3"></div>
        </header>
      )
    }

    return (
      <header className="text-center w-full">
        <h1 className="text-3xl font-bold mb-2 dark:text-gray-300">
          {project?.name ?? 'Nenhum projeto selecionado'}
        </h1>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          {project?.description ?? 'Selecione um projeto na lista de projetos ao lado'}
        </p>
      </header>
    )
  }

  function renderTasks() {
    if (initialLoading) {
      return (
        Object.keys(TASK_STATUSES).map((key) => (
          <TaskStatusSkeleton key={key}>
            {Array.from({ length: 2 }).map((_, index) => (
              <TaskSkeleton key={index} />
            ))}
          </TaskStatusSkeleton>
        ))
      )
    }

    if (project) {
      return Object.keys(TASK_STATUSES).map((key) => {
        const status: TaskStatusOption = key as TaskStatusOption;
        const filteredTasks = searchTasks(status);

        return (
          <TaskStatus
            key={key}
            status={status}
            createTask={() => createTaskMutation.mutate({ status, projectId: project.id })}
            setTaskQuery={setTasksQuery}
            value={deferredTasksQuery[status]}
          >
            {filteredTasks.map((task: TaskType) => (
              <Task onClick={() => console.log('oi')} key={task.id} task={task} projectId={project.id} />
            ))}
          </TaskStatus>
        )
      })
    }

    return null;
  }

  function searchTasks(status: TaskStatusOption) {
    return tasks?.[status].filter((t: TaskType) => t.name.toLowerCase().includes(deferredTasksQuery[status].toLowerCase())) ?? [];
  }

  async function onSubmit(data: Inputs) {
    if (project) {
      updateProjectMutation.mutate({
        id: project.id,
        name: data.name,
        description: data.description,
      });
      return;
    }

    createProjectMutation.mutate(data);
  }

  const {
    isPending: isPendingProjects,
    isError: isErrorProjects,
    data: projects,
    refetch: refetchProjects,
  } = useQuery({
    queryKey: ['projects', deferredProjectsQuery],
    queryFn: () => getProjects(projectsQuery),
  });

  const createProjectMutation = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      refetchProjects();
      closeModal('create-project-modal');
      toast.success('Projeto criado com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao criar projeto!');
    },
  });

  const updateProjectMutation = useMutation({
    mutationFn: updateProject,
    onSuccess: () => {
      refetchProjects();
      closeModal('create-project-modal');
      toast.success('Projeto atualizado com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao atualizar projeto!');
    },
  });

  const deleteProjectMutation = useMutation({
    mutationFn: (id?: string) => deleteProject({ id }),
    onSuccess: () => {
      refetchProjects();
      closeModal('delete-project-modal');
      toast.success('Projeto deletado com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao deletar projeto!');
    },
  });

  const {
    isError: isErrorTasks,
    data: tasks,
    refetch: refetchTasks,
  } = useQuery({
    queryKey: ['tasks', project?.id],
    queryFn: () => getTasks({ id: project?.id }),
  });

  const createTaskMutation = useMutation({
    mutationFn: ({ status, projectId }: { status: TaskStatusOption, projectId?: string }) => createTask(status, { id: projectId }),
    onSuccess: () => {
      refetchTasks();
      toast.success('Tarefa criada com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao criar tarefa!');
    }
  });

  useEffect(() => {
    if (isErrorProjects) {
      toast.error('Erro ao buscar projetos!');
    }

    if (isErrorTasks) {
      toast.error('Erro ao buscar tarefas!');
    }
  }, [isErrorProjects, isErrorTasks]);

  useEffect(() => {
    if (projects && initialLoading) {
      setInitialLoading(false);
    }
  }, [projects, initialLoading]);

  return (
    <QueryClientProvider client={queryClient}>
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

        <Modal id="create-project-modal">
          <ModalHeader>
            <ModalTitle>{project ? 'Editar' : 'Adicionar'} projeto</ModalTitle>
            <ModalClose onClick={() => closeModal('create-project-modal')} />
          </ModalHeader>
          <fieldset disabled={createProjectMutation.isPending || updateProjectMutation.isPending} className="disabled:opacity-50">
            <ModalBody>
              <form onSubmit={handleSubmit(onSubmit)} id="create-project-form" className='flex flex-col gap-3'>
                <Input error={errors.name?.message} {...register('name')} autoComplete='off' id="project-name" label="Nome do projeto"/>

                <Textarea error={errors.description?.message} {...register('description')} id="project-description" label="Descrição do projeto"/>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button loading={createProjectMutation.isPending || updateProjectMutation.isPending} className="flex items-center" form="create-project-form">{project ? 'Salvar' : 'Criar'}</Button>
              <Button onClick={() => closeModal('create-project-modal')} variant="outline-primary">Cancelar</Button>
            </ModalFooter>
          </fieldset>
        </Modal>

        <Modal id="delete-project-modal">
          <ModalHeader>
            <ModalTitle>Deletar projeto?</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <p>Tem certeza de que deseja deletar o projeto {project?.name}?</p>
          </ModalBody>
          <ModalFooter>
            <Button loading={deleteProjectMutation.isPending} onClick={() => deleteProjectMutation.mutate(project?.id)} variant="primary">Deletar</Button>
            <Button onClick={() => closeModal('delete-project-modal')} variant="outline-primary">Cancelar</Button>
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

            <Searchbar
              name="projects_query"
              value={deferredProjectsQuery}
              onSearch={(e) => setProjectsQuery(e.target.value)}
              className="mt-6"
            />

            <div className="mt-4 flex flex-col w-full gap-3 overflow-y-auto overflow-x-hidden max-h-screen">
              {renderProjects()}
            </div>
          </div>
        </aside>
        <section className="ml-52 overflow-hidden">
          <nav
            className="z-[1] fixed h-12 bg-white flex justify-end px-4 py-7 gap-3 items-center left-52 right-0 border-b border-gray-300 dark:bg-slate-900 dark:border-slate-700"
          >
            <button onClick={toggleThemeDropdown} className="flex items-center justify-center cursor-pointer hover:bg-gray-200 dark:hover:bg-slate-800 rounded-full p-1">
              {renderThemeIcon()}
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

          <main className="flex flex-col items-center px-6 pt-20 dark:bg-slate-950 bg-gray-50 h-screen gap-6">
            {renderProjectHeader()}

            <div className="grid grid-cols-4 gap-4">
              {renderTasks()}
            </div>
          </main>
        </section>
      </>
    </QueryClientProvider>
  )
}

export default App
