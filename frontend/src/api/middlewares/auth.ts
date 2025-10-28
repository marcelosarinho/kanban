import { api } from "..";

export default async function auth() {
  return api.get('/authenticate', { credentials: 'include' });
}