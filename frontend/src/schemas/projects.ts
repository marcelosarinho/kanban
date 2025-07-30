import z from "zod";

export const projectSchema = z.object({
  name: z.string().trim().min(1, "Nome do projeto é obrigatório!"),
  description: z.string().trim().min(1, "Descrição do projeto é obrigatória!"),
});