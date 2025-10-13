export type Response = {
  deviceStatus: "verified" | "unverified";
  reason: "first_login" | "signature_changed" | "ip_changed" | "stale_login" | null;
};

export type DeviceInfo = {
  ip?: string;
  userAgent?: string;
  signature?: string;
};