import { Link } from "react-router";

export default function Error() {
  return (
    <main className="flex flex-col-reverse items-center justify-center gap-8 h-screen md:flex-row mx-16">
      <div className="text-center md:text-left flex-1">
        <h2 className="text-2xl dark:text-gray-300 mb-4">ERRO 404</h2>
        <h1 className="text-4xl font-medium dark:text-gray-300 mb-4">Página não encontrada!</h1>
        <p className="text-lg dark:text-gray-300">A página que você está tentando acessar não foi encontrada ou pode ter sido removida.</p>
        <p className="text-lg dark:text-gray-300">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam facilis recusandae, nesciunt minus expedita dignissimos ex asperiores ab odit possimus cupiditate voluptatum adipisci laudantium quas distinctio, sint accusantium. Quibusdam est ad sapiente nobis neque pariatur dolor laboriosam, eaque quisquam assumenda cumque sit illum corporis cum doloremque minus distinctio delectus dolores enim. Dolor est provident sapiente exercitationem aliquam possimus asperiores. Voluptatem cumque, facere illo reiciendis dolor tempore doloremque eligendi autem tempora sint possimus quaerat odio aspernatur magnam doloribus sequi eius, perferendis, mollitia reprehenderit. Dicta obcaecati porro labore dolorem doloremque, necessitatibus at. Aspernatur nulla tempora id placeat enim nihil. Ab, totam minus!</p>
        <Link className="inline-block bg-primary text-white px-3 py-2 rounded-md text-sm font-medium mt-6 hover:-translate-y-1 transition" to="/kanban">Ir para a página inicial</Link>
      </div>
      <img width={300} height={300} src="/404.svg" alt="Imagem de erro 404" />
    </main>
  )
}