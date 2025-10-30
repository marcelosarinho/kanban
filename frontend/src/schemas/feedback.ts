import z from "zod";

export const feedbackSchema = z.object({
  experience: z.enum(['positive', 'neutral', 'negative']),
  rating: z.number().optional(),
  feedback: z.string().optional(),
});