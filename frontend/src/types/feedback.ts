export type Feedback = {
  experience: Experience;
  rating?: number;
  feedback?: string;
}

export type Experience = 'positive' | 'neutral' | 'negative';