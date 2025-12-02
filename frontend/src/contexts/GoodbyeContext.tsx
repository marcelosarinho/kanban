import { createContext } from "react";

type GoodbyeContextType = {
  goodbye: boolean;
  setGoodbye: (goodbye: boolean) => void;
}

export const GoodbyeContext = createContext<GoodbyeContextType | null>(null);

export function useGoodbye(ctx: GoodbyeContextType) {
  if (!ctx) {
    throw new Error('useGoodbye deve ser usado dentro de um GoodbyeProvider');
  }

  return ctx;
}
