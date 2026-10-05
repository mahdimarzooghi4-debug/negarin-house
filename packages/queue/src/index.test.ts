import { describe, expect, it } from "vitest";
import { DOMAIN_EVENTS_QUEUE, FOUNDATION_QUEUE, redisConnectionFromUrl } from "./index.js";

describe("queue foundation", () => {
  it("uses stable infrastructure queue names", () => {
    expect(FOUNDATION_QUEUE).toBe("foundation");
    expect(DOMAIN_EVENTS_QUEUE).toBe("domain-events");
  });

  it("parses Redis connection details", () => {
    expect(redisConnectionFromUrl("redis://user:secret@localhost:6380")).toEqual({
      host: "localhost",
      port: 6380,
      username: "user",
      password: "secret"
    });
  });

  it("enables TLS for rediss", () => {
    expect(redisConnectionFromUrl("rediss://cache.example:6379")).toMatchObject({
      host: "cache.example",
      port: 6379,
      tls: {}
    });
  });
});
