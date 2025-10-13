import { DAYS_TO_STALE_LOGIN } from "@lib/constants";
import dayjs from "@lib/dayjs";
import { User } from "@custom-types/user";
import { DeviceInfo, Response } from "@custom-types/login";
import { UAParser } from "ua-parser-js";

function getDeviceSignature(userAgent: Pick<DeviceInfo, "userAgent">) {
  const parser = new UAParser(userAgent);
  const { browser, os, device } = parser.getResult();

  console.log(browser)
  console.log(os)
  console.log(device)
}

export function checkLoginVerification(user: Pick<User, "firstLoginVerify" | "deviceInfo" | "lastVerifiedLogin">, deviceInfo: DeviceInfo) {
  getDeviceSignature(deviceInfo);
  return;

  if (!user.firstLoginVerify) {
    return { status: "unverified", reason: "first_login" } as Response;
  }

  const diffInDays = dayjs.utc().diff(dayjs.utc(user.lastVerifiedLogin), 'days');

  if (diffInDays >= DAYS_TO_STALE_LOGIN) {
    return { status: "unverified", reason: "stale_login" } as Response;
  }

  return { status: "verified", reason: null } as Response;
}