import { describe, expect, it, vi } from "vitest";
import {
  JsonConsoleAuditSink,
  NoopErrorTracker,
  redactLogPayload,
  startNodeTelemetry
} from "./index.js";

describe("observability foundation", () => {
  it("redacts common secret and financial fields", () => {
    expect(redactLogPayload({ otp: "123456", token: "secret", safe: "ok" })).toEqual({
      otp: "[REDACTED]",
      token: "[REDACTED]",
      safe: "ok"
    });
  });

  it("writes structured audit events", async () => {
    const spy = vi.spyOn(console, "info").mockImplementation(() => undefined);
    const sink = new JsonConsoleAuditSink();

    await sink.write({
      actorId: "USR-1",
      activeContext: "admin",
      action: "sample",
      resourceType: "system",
      resourceId: "SYS-1",
      requestId: "req-1",
      result: "success",
      occurredAt: new Date(0).toISOString()
    });

    expect(spy).toHaveBeenCalledOnce();
    spy.mockRestore();
  });

  it("provides a safe no-op error tracker boundary", () => {
    expect(() => new NoopErrorTracker().capture(new Error("sample"))).not.toThrow();
  });

  it("keeps telemetry disabled in tests", async () => {
    const telemetry = await startNodeTelemetry("negarin-test");
    await expect(telemetry.shutdown()).resolves.toBeUndefined();
  });
});
