import type { AuthUser } from "@custom-types/user";
import { createContext } from "react-router";

export const userContext = createContext<AuthUser | null>(null);