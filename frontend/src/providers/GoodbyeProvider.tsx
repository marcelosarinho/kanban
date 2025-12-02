import { GoodbyeContext } from "@contexts/GoodbyeContext";
import type { ReactNode } from "react";
import { useState } from "react";

export default function GoodbyeProvider({ children }: { children: ReactNode }) {
  const [goodbyeToken, setGoodbyeToken] = useState<string | null>(null);

  return (
    <GoodbyeContext.Provider value={{ goodbyeToken, setGoodbyeToken }}>
      {children}
    </GoodbyeContext.Provider>
  )
}