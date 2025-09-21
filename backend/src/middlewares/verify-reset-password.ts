import dayjs from "dayjs";
import { db } from "..";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";

export default async function verifyResetPassword(token: string, next: any) {
  const user = await db.query.users.findFirst({ where: eq(users.forgotPasswordToken, token) });

  if (!user) {
    return false;
  }

  if (user && user.forgotPasswordTokenExpiry && dayjs().isAfter(dayjs.utc(user.forgotPasswordTokenExpiry))) {
    return false;
  }

  return next();
}