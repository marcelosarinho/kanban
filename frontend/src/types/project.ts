export type Project = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export type CreateProject = Pick<Project, 'name' | 'description'>;
export type UpdateProject = Omit<Project, 'createdAt' | 'updatedAt'>;