import type { User } from "@custom-types/user";
import { api } from "./index";

export async function createUser(user: Pick<User, 'name' | 'email' | 'password'>) {
  return await api.post(`http://localhost:8080/users`, user);
}

export async function login(user: Pick<User, 'email' | 'password'>) {
  return await api.post(`http://localhost:8080/login`, user);
}

export async function forgotPassword(email: Pick<User, 'email'>) {
  return await api.post(`http://localhost:8080/forgot-password`, email);
}

export async function verifyResetPassword(token: string, email: string) {
  return await api.get(`http://localhost:8080/verify-reset-password?token=${token}&email=${email}`);
}

export async function resetPassword(token: string | null = null, email: string | null = null, password: string) {
  return await api.post(`http://localhost:8080/reset-password`, { token, email, password });
}

export async function verifyDevice(code: string, email: string) {
  return await api.post(`http://localhost:8080/verify-device`, { code, email });
}