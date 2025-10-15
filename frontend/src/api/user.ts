import type { ResetPassword, User, VerifyDevice } from "@custom-types/user";
import { api } from "./index";

export async function createUser(user: Pick<User, 'name' | 'email' | 'password'>) {
  return api.post(`http://localhost:8080/users`, user);
}

export async function login(user: Pick<User, 'email' | 'password'>) {
  return api.post<{ data: { verified: boolean, email: string } }>(`http://localhost:8080/login`, user, { credentials: 'include' });
}

export async function forgotPassword(email: Pick<User, 'email'>) {
  return api.post(`http://localhost:8080/forgot-password`, email);
}

export async function verifyResetPassword(resetPassword: Pick<ResetPassword, 'token' | 'email'>) {
  return api.get(`http://localhost:8080/verify-reset-password?token=${resetPassword.token}&email=${resetPassword.email}`);
}

export async function resetPassword(resetPassword: ResetPassword) {
  return api.post(`http://localhost:8080/reset-password`, resetPassword);
}

export async function verifyDevice(verifyDevice: VerifyDevice) {
  return api.post(`http://localhost:8080/verify-device`, verifyDevice, { credentials: 'include' });
}