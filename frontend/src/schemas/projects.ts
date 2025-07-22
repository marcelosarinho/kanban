import z from "zod";

export const projectSchema = z.object({
  name: z.string().min(3, "Nome do projeto deve ter pelo menos 3 caracteres"),
  description: z.string().min(3, "Descrição do projeto deve ter pelo menos 3 caracteres"),
});