import { api } from "..";

export default async function auth() {
  return api.get('/me', { credentials: 'include' });
}