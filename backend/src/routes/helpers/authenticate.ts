import { DAYS_TO_STALE_LOGIN } from "../../lib/constants";
import dayjs from "../../lib/dayjs";
import { User } from "../../types/user";

type Response = {
  status: "verified" | "unverified";
  reason: "first_login" | "ip_changed" | "stale_login" | null;
};

type DeviceInfo = {
  ip: string;
  userAgent: string;
}

export function checkLoginVerification(user: Pick<User, "verified" | "ip" | "lastVerifiedLoginAt">, deviceInfo: DeviceInfo) {
  if (!user.verified) {
    return { status: "unverified", reason: "first_login" } as Response;
  }

  // if (user.ip !== requestIp) {
  //   return { status: "unverified", reason: "ip_changed" } as Response;
  // }

  const diffInDays = dayjs.utc().diff(dayjs.utc(user.lastVerifiedLoginAt), 'days');

  if (diffInDays >= DAYS_TO_STALE_LOGIN) {
    return { status: "unverified", reason: "stale_login" } as Response;
  }

  return { status: "verified", reason: null } as Response;
}