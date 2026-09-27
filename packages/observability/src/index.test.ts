import { describe, expect, it } from "vitest";
import { redactLogPayload } from "./index.js";

describe("redactLogPayload", () => {
  it("redacts common secret and financial fields", () => {
    expect(redactLogPayload({ otp: "123456", token: "secret", safe: "ok" })).toEqual({
      otp: "[REDACTED]",
      token: "[REDACTED]",
      safe: "ok"
    });
  });
});
