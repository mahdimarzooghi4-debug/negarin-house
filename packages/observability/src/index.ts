const sensitiveKeys = new Set([
  "otp",
  "token",
  "accessToken",
  "refreshToken",
  "authorization",
  "password",
  "bankAccount",
  "bankCard"
]);

export type AuditEvent = {
  actorId: string;
  activeContext: string;
  action: string;
  resourceType: string;
  resourceId: string;
  requestId: string;
  result: "success" | "denied" | "failed";
  occurredAt: string;
};

export function redactLogPayload(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(redactLogPayload);

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [
        key,
        sensitiveKeys.has(key) ? "[REDACTED]" : redactLogPayload(item)
      ])
    );
  }

  return value;
}
