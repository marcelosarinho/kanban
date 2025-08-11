export type Project = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export type CreateProject = {
  name: string;
  description: string;
}

export type UpdateProject = {
  id: string;
  name?: string;
  description?: string;
}