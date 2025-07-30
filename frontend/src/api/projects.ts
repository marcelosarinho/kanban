export async function getProjects() {
  try {
    const response = await fetch('http://localhost:8080/projects');
    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Erro ao buscar projetos!', error);
  }
}