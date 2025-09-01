export type Project = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export type UpdateProject = Omit<Project, 'createdAt' | 'updatedAt'>;