export type CreateProject = {
  name: string;
  description: string;
}

export type UpdateProject = {
  id: string;
  name?: string;
  description?: string;
}