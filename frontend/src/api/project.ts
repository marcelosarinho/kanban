import type { Project } from "@custom-types/project";
import { api } from "./index";

export async function getProjects(search: string = '') {
  return api.get<{ data: Project[] }>(`/projects?search=${search}`);
}

export async function createProject(project: Pick<Project, 'name' | 'description'>) {
  return api.post<{ data: Project }>(`/projects`, project);
}

export async function deleteProject({ id }: Pick<Project, 'id'>) {
  return api.delete<{ data: Project }>(`/projects/${id}`);
}

export async function updateProject(project: Omit<Project, 'createdAt' | 'updatedAt'>) {
  return api.put<{ data: Project }>(`/projects/${project.id}`, project);
}