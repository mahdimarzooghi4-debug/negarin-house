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

export interface AuditSink {
  write(event: AuditEvent): Promise<void>;
}

export class JsonConsoleAuditSink implements AuditSink {
  async write(event: AuditEvent): Promise<void> {
    console.info(JSON.stringify({ type: "audit", ...redactLogPayload(event) }));
  }
}

export type ErrorContext = Readonly<{
  requestId?: string;
  actorId?: string;
  resourceType?: string;
  resourceId?: string;
}>;

export interface ErrorTracker {
  capture(error: unknown, context?: ErrorContext): void;
}

export class NoopErrorTracker implements ErrorTracker {
  capture(_error: unknown, _context?: ErrorContext): void {}
}

export interface TelemetryHandle {
  shutdown(): Promise<void>;
}

const noopTelemetry: TelemetryHandle = {
  async shutdown() {}
};

export async function startNodeTelemetry(serviceName: string): Promise<TelemetryHandle> {
  if (process.env.NODE_ENV === "test" || process.env.OTEL_SDK_DISABLED === "true") {
    return noopTelemetry;
  }

  process.env.OTEL_SERVICE_NAME ??= serviceName;

  const { NodeSDK } = await import("@opentelemetry/sdk-node");
  const sdk = new NodeSDK();

  sdk.start();

  return {
    async shutdown() {
      await sdk.shutdown();
    }
  };
}

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
