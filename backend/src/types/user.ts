export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  verified: boolean;
  verifyToken: string | null;
  verifyTokenExpiry: string | null;
  forgotPasswordToken: string | null;
  forgotPasswordTokenExpiry: string | null;
  verifyLoginToken: string | null;
  lastVerifiedLoginAt: string | null;
  firstLoginVerify: boolean;
  ip: string | null;
  createdAt: string;
  updatedAt: string;
};
