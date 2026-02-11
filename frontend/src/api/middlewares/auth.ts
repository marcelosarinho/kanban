import { api } from "..";

export default async function auth<T = unknown>() {
  return api.get<T>('/authenticate', { credentials: 'include' });
}