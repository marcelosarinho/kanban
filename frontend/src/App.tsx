import { useEffect, useState } from 'react';

function App() {
  const [themeDropdown, setThemeDropdown] = useState(false);

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
    if (selectedTheme === 'dark' || selectedTheme === 'light') {
      localStorage.setItem('theme', selectedTheme);
      document.documentElement.classList.toggle('dark', selectedTheme === 'dark');
      return;
    }

    localStorage.removeItem('theme');
    document.documentElement.classList.toggle('dark', window.matchMedia("(prefers-color-scheme: dark)").matches);
  }

  useEffect(() => {
    const theme = localStorage.getItem('theme');

    document.documentElement.classList.toggle('dark', theme === 'dark' || !("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches);
  }, [])

  return (
    <>
      <aside className="fixed w-52 bg-white h-full border-r border-gray-300 dark:bg-slate-900 dark:border-slate-700">
        <div className="flex flex-col items-center px-2">
          <h3 className="text-xl font-semibold text-center mb-4 mt-2 dark:text-gray-300">Projetos</h3>
          <button type="button" className="bg-primary text-white">
            <i className="ph-bold ph-plus text-lg"></i>
            Adicionar projeto
          </button>

          <div
            className="mt-6 rounded py-0.5 px-1 bg-gray-50 h-fit flex items-center border dark:bg-slate-800 dark:border-slate-700"
          >
            <input type="text" className="outline-none px-0.5 text-sm bg-gray-50 dark:bg-slate-800 dark:text-gray-300" />
            <button className="flex items-center p-0.5">
              <i className="ph ph-magnifying-glass text-xl dark:text-gray-300"></i>
            </button>
          </div>
          <div className="mt-4 flex flex-col w-full gap-3"></div>
        </div>
      </aside>
      <section className="ml-52">
        <nav
          className="z-[1] fixed h-12 bg-white flex justify-end px-4 py-7 gap-3 items-center left-52 right-0 border-b border-gray-300 dark:bg-slate-900 dark:border-slate-700"
        >
          <button onClick={toggleThemeDropdown} className='flex items-center justify-center cursor-pointer hover:bg-gray-200 dark:hover:bg-slate-800 rounded-full p-1'>
            <i className="ph ph-sun text-2xl dark:text-gray-300"></i>
          </button>
          <button onClick={toggleFullScreen} className='flex items-center justify-center cursor-pointer hover:bg-gray-200 dark:hover:bg-slate-800 rounded-full p-1'>
            <i className="ph ph-arrows-out text-2xl dark:text-gray-300"></i>
          </button>
          {themeDropdown && (
            <div className="absolute right-12 top-10 bg-white rounded-md mt-2 p-2 w-28 text-sm border border-gray-300 dark:bg-slate-900 dark:border-slate-700 dark:text-gray-300 select-none">
              <div onClick={() => changeTheme('dark')} className="rounded px-2 py-1 flex items-center hover:bg-gray-100 cursor-pointer dark:hover:bg-slate-800">
                <i className="mr-2 ph ph-moon text-xl"></i>
                Escuro
              </div>
              <div onClick={() => changeTheme('light')} className="rounded px-2 py-1 flex items-center hover:bg-gray-100 cursor-pointer dark:hover:bg-slate-800">
                <i className="mr-2 ph ph-sun text-xl"></i>
                Claro
              </div>
              <div onClick={() => changeTheme('system')} className="rounded px-2 py-1 flex items-center hover:bg-gray-100 cursor-pointer dark:hover:bg-slate-800">
                <i className="mr-2 ph ph-moon-stars text-xl"></i>
                Sistema
              </div>
            </div>
          )}
        </nav>

        <main className="flex flex-col items-center justify-center px-6 pt-20 dark:bg-slate-950 bg-gray-50">
          <h1 className="text-3xl font-bold mb-4 dark:text-gray-300">
            Kanban
          </h1>

          <p className="text-sm text-gray-500 dark:text-gray-400">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis, et.</p>

          <div className="flex justify-between w-full mb-4">
            <button type="button" className="bg-success text-black">
              <i className="ph-bold ph-plus text-lg"></i>
              Adicionar tarefa
            </button>
          </div>

          <div className="flex gap-4">
            <div className="col-lg-3 h-100">
              <header className="text-2xl font-bold mb-2 dark:text-gray-300">
                A fazer
              </header>
              <div className="flex flex-col max-h-full gap-3 p-3 w-72 rounded border border-gray-300 bg-white dark:bg-slate-900 dark:border-slate-700 overflow-x-auto">
              </div>
            </div>
            <div className="col-lg-3 h-100">
              <header className="text-2xl font-bold mb-2 dark:text-gray-300">
                Em progresso
              </header>
              <div className="h-96 w-72 rounded border border-gray-300 bg-white dark:bg-slate-900 dark:border-slate-700">
                <div></div>
              </div>
            </div>
            <div className="col-lg-3 h-100">
              <header className="text-2xl font-bold mb-2 dark:text-gray-300">
                Testando
              </header>
              <div className="h-96 w-72 rounded border border-gray-300 bg-white dark:bg-slate-900 dark:border-slate-700">
                <div></div>
              </div>
            </div>
            <div className="col-lg-3 h-100">
              <header className="text-2xl font-bold mb-2 dark:text-gray-300">
                Implementado
              </header>
              <div className="h-96 w-72 rounded border border-gray-300 bg-white dark:bg-slate-900 dark:border-slate-700">
                <div></div>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  )
}

export default App
