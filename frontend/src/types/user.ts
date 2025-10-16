export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  verified: boolean;
  verifyToken: string;
  verifyTokenExpires: string;
  createdAt: string;
  updatedAt: string;
};

export type ResetPassword = {
  token: string | null;
  email: string | null;
  password: string;
}