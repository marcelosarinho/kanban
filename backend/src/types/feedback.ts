export type Feedback = {
  id: number;
  experience: Experience;
  rating?: number;
  feedback?: string;
  createdAt: string;
  updatedAt: string;
}

export type Experience = "positive" | "negative" | "neutral";