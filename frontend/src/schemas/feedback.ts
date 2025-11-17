import z from "zod";

export const feedbackSchema = z.object({
  experience: z.enum(['positive', 'neutral', 'negative'], { error: 'Selecione uma opção para continuar!' }),
  rating: z.number().optional(),
  feedback: z.string()
    .transform(val => (val === '' ? undefined : val?.trim()))
    .optional(),
});