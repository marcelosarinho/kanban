import { FastifyInstance, FastifyReply } from "fastify";
import { Feedback } from "@custom-types/feedback";
import { db } from "index";
import { feedbacks } from "@db/schema";

export async function createFeedback(app: FastifyInstance) {
  app.post<{ Body: Pick<Feedback, 'experience' | 'rating' | 'feedback'> }>('/feedback', async (request, reply: FastifyReply) => {
    const { experience, rating, feedback } = request.body;

    if (!experience) {
      return reply.badRequest('Experiência é obrigatória!');
    }

    if (rating && (rating < 1 || rating > 5)) {
      return reply.badRequest('Avaliação deve estar entre 1 e 5!');
    }

    if (feedback && feedback.length > 255) {
      return reply.badRequest('Feedback deve ter no máximo 255 caracteres!');
    }

    const formattedFeedback = feedback?.trim() === '' ? null : feedback?.trim();

    await db.insert(feedbacks).values({ experience, rating, feedback: formattedFeedback });

    return reply.ok('Feedback enviado com sucesso!');
  });
}