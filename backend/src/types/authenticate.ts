export type Response = {
  status: "verified" | "unverified";
  reason: "first_login" | "ip_changed" | "stale_login" | null;
};

export type DeviceInfo = {
  ip: string;
  userAgent: string;
  signature: string;
}