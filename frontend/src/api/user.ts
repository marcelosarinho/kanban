import type { ResetPassword, User } from "@custom-types/user";
import { api } from "./index";

export async function createUser(user: Pick<User, 'name' | 'email' | 'password'>) {
  return api.post('/users', user);
}

export async function login(user: Pick<User, 'email' | 'password'>) {
  return api.post<{ data: { verified: boolean, email: string } }>(`/login`, user, { credentials: 'include' });
}

export async function logout() {
  return api.post('/logout', {}, { credentials: 'include' });
}

export async function forgotPassword(email: Pick<User, 'email'>) {
  return api.post('/forgot-password', email);
}

export async function verifyResetPassword(resetPassword: Pick<ResetPassword, 'token' | 'email'>) {
  return api.get(`/verify-reset-password?token=${resetPassword.token}&email=${resetPassword.email}`);
}

export async function resetPassword(resetPassword: ResetPassword) {
  return api.post('/reset-password', resetPassword);
}

export async function verifyDevice(code: string) {
  return api.post('/verify-device', { code }, { credentials: 'include' });
}

export async function verifyEmail({ email, token }: { email: string, token: string }) {
  return api.post('/verify-email', { email, token });
}