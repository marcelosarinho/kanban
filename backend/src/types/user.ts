import { DeviceInfo } from "./authenticate";

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
  lastVerifiedLogin: string | null;
  firstLoginVerify: boolean;
  deviceInfo: DeviceInfo | null;
  createdAt: string;
  updatedAt: string;
};
