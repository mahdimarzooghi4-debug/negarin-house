import { describe, expect, it } from "vitest";
import { readLimitedJsonBody } from "./artist-api";

describe("bounded browser JSON reader", () => {
  it("parses JSON within the shared body limit", async () => {
    const result = await readLimitedJsonBody(new Request("http://localhost/api/write", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "کار" })
    }));

    expect(result).toEqual({ kind: "ready", value: { title: "کار" } });
  });

  it("rejects an oversized streamed body before it can be forwarded", async () => {
    const body = JSON.stringify({ value: "x".repeat(64 * 1024) });
    const result = await readLimitedJsonBody(new Request("http://localhost/api/write", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body
    }));

    expect(result).toEqual({ kind: "too-large" });
  });

  it("rejects malformed or empty JSON", async () => {
    const malformed = await readLimitedJsonBody(new Request("http://localhost/api/write", {
      method: "POST", body: "{"
    }));
    const empty = await readLimitedJsonBody(new Request("http://localhost/api/write", {
      method: "POST"
    }));

    expect(malformed).toEqual({ kind: "invalid" });
    expect(empty).toEqual({ kind: "invalid" });
  });
});
