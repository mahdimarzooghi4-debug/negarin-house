import { describe, expect, it } from "vitest";
import { redisConnectionFromUrl } from "./redis-connection.js";

describe("redisConnectionFromUrl", () => {
  it("parses Redis host and port", () => {
    expect(redisConnectionFromUrl("redis://localhost:6380")).toEqual({
      host: "localhost",
      port: 6380,
      username: undefined,
      password: undefined
    });
  });
});
