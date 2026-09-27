import { describe, expect, it } from "vitest";
import { loadConfig } from "./index.js";

describe("loadConfig", () => {
  it("parses a valid foundation environment", () => {
    const config = loadConfig({
      NODE_ENV: "test",
      WEB_URL: "http://localhost:3000",
      API_PORT: "4000",
      DATABASE_URL: "postgresql://example",
      REDIS_URL: "redis://localhost:6379"
    });

    expect(config.API_PORT).toBe(4000);
    expect(config.NODE_ENV).toBe("test");
  });

  it("fails when required infrastructure configuration is missing", () => {
    expect(() => loadConfig({ NODE_ENV: "test" })).toThrow();
  });
});
