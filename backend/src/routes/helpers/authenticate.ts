import { User } from "../../types/user";


type Response = {
  status: "verified" | "unverified";
  reason: "first_login" | "ip_changed" | "stale_login";
};

export async function checkLoginVerification(user: Pick<User, "verified" | "ip" | "lastVerifiedLoginAt">) {
  if (!user.verified) {
    return { status: "unverified", reason: "first_login" } as Response;
  }

  // if (user.ip) {

  // }
}