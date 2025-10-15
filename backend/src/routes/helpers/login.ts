import { DAYS_TO_STALE_LOGIN } from "@lib/constants";
import dayjs from "@lib/dayjs";
import { User } from "@custom-types/user";
import { DeviceInfo, Response } from "@custom-types/login";
import { UAParser } from "ua-parser-js";

export function getDeviceSignature(userAgent?: string) {
  if (!userAgent) return;

  const parser = new UAParser(userAgent);
  const { browser, os, device } = parser.getResult();

  const deviceType = device.type ?? 'desktop';
  const signature = `${browser.name}-${os.name}-${deviceType}`;

  return signature;
}

function verifyNetwork(userIp?: string, loginIp?: string) {
  if (!userIp || !loginIp) {
    return false;
  }

  const userSubnet = userIp.split('.').slice(0, 3).join('.');
  const loginSubnet = loginIp.split('.').slice(0, 3).join('.');

  return userSubnet === loginSubnet;
}

export function checkLoginVerification(user: Pick<User, "firstLoginVerify" | "deviceInfo" | "lastVerifiedLogin">, deviceInfo: DeviceInfo) {
  if (!user.firstLoginVerify) {
    return { deviceStatus: "unverified", reason: "first_login" } as Response;
  }

  const signature = getDeviceSignature(deviceInfo.userAgent);

  if (signature !== user.deviceInfo?.signature) {
    return { deviceStatus: "unverified", reason: "signature_changed" } as Response;
  }
  
  const isSameNetwork = verifyNetwork(user.deviceInfo?.ip, deviceInfo.ip);

  if (!isSameNetwork) {
    return { deviceStatus: "unverified", reason: "ip_changed" } as Response;
  }

  const diffInDays = dayjs.utc().diff(dayjs.utc(user.lastVerifiedLogin), 'days');

  if (diffInDays >= DAYS_TO_STALE_LOGIN) {
    return { deviceStatus: "unverified", reason: "stale_login" } as Response;
  }

  return { deviceStatus: "verified", reason: null } as Response;
}