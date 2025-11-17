import type { Feedback } from "@custom-types/feedback";
import { api } from "./index";

export async function createFeedback(feedback: Feedback) {
  return api.post('/feedback', feedback);
}