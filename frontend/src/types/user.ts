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

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  verified: boolean;
}

export type ResetPassword = {
  token: string | null;
  email: string | null;
  password: string;
};

export type UserSession = {
  id: string;
  name: string;
  email: string;
  verified: boolean;
  exp: number;
  iat: number;
};