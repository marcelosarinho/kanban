import { createContext, useContext } from "react";

type GoodbyeContextType = {
  goodbyeToken: string | null;
  setGoodbyeToken: (goodbyeToken: string | null) => void;
}

export const GoodbyeContext = createContext<GoodbyeContextType | null>(null);

export function useGoodbye() {
  const ctx = useContext(GoodbyeContext);

  if (!ctx) {
    throw new Error('useGoodbye deve ser usado dentro de um GoodbyeProvider');
  }

  return ctx;
}
