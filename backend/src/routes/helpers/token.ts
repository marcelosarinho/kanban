import { randomBytes } from "crypto";
import dayjs from "@lib/dayjs";
import argon2 from 'argon2';

export async function generateToken(amount: number, unit: 'days' | 'hours' | 'minutes') {
  const token = randomBytes(64).toString('hex');
  const expiry = dayjs.utc().add(amount, unit).format();
  const hashToken = await argon2.hash(token);

  return { token, hashToken, expiry };
}