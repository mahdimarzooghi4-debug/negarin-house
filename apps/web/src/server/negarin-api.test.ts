import { afterEach, describe, expect, it, vi } from "vitest";
import {
  NEGARIN_SESSION_COOKIE,
  apiOrigin,
  apiUrl,
  devSessionAttachEnabled,
  isSameOriginMutation,
  isSessionToken,
  isUuid,
  negarinFetch,
  sessionCookieOptions
} from "./negarin-api";

const token = "A".repeat(43);

describe("Negarin web server API boundary", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("accepts only an http(s) API origin with no credentials or path", () => {
    expect(apiOrigin({ NEGARIN_API_URL: "https://api.example.test" } as NodeJS.ProcessEnv)).toBe("https://api.example.test");
    expect(apiOrigin({} as NodeJS.ProcessEnv)).toBe("http://localhost:4000");

    for (const invalid of [
      "ftp://api.example.test",
      "https://user:pass@api.example.test",
      "https://api.example.test/base",
      "https://api.example.test?x=1",
      "https://api.example.test#fragment"
    ]) {
      expect(() => apiOrigin({ NEGARIN_API_URL: invalid } as NodeJS.ProcessEnv)).toThrow();
    }
  });

  it("proxies only explicit API v1 paths and rejects normalized traversal", () => {
    expect(apiUrl("/api/v1/identity/grants", { NEGARIN_API_URL: "https://api.example.test" } as NodeJS.ProcessEnv))
      .toBe("https://api.example.test/api/v1/identity/grants");
    for (const invalid of ["/health", "/api/v1/../admin", "/api/v1/x\\y", " /api/v1/x"]) {
      expect(() => apiUrl(invalid, { NEGARIN_API_URL: "https://api.example.test" } as NodeJS.ProcessEnv)).toThrow();
    }
  });

  it("requires browser mutations to come from the exact request origin", () => {
    expect(isSameOriginMutation("https://app.example.test", "https://app.example.test")).toBe(true);
    expect(isSameOriginMutation("https://app.example.test/", "https://app.example.test")).toBe(true);
    expect(isSameOriginMutation("https://evil.example.test", "https://app.example.test")).toBe(false);
    expect(isSameOriginMutation(null, "https://app.example.test")).toBe(false);
    expect(isSameOriginMutation("not a url", "https://app.example.test")).toBe(false);
  });

  it("accepts only the exact base64url session token shape and UUID resource ids", () => {
    expect(isSessionToken(token)).toBe(true);
    expect(isSessionToken("A".repeat(42))).toBe(false);
    expect(isSessionToken("A".repeat(42) + "=")).toBe(false);
    expect(isUuid("00000000-0000-4000-8000-000000000001")).toBe(true);
    expect(isUuid("../identity/grants")).toBe(false);
  });

  it("keeps development session attachment explicitly opt-in and impossible in production", () => {
    expect(devSessionAttachEnabled({ NODE_ENV: "development", NEGARIN_DEV_SESSION_ATTACH: "1" } as NodeJS.ProcessEnv)).toBe(true);
    expect(devSessionAttachEnabled({ NODE_ENV: "development" } as NodeJS.ProcessEnv)).toBe(false);
    expect(devSessionAttachEnabled({ NODE_ENV: "production", NEGARIN_DEV_SESSION_ATTACH: "1" } as NodeJS.ProcessEnv)).toBe(false);
  });

  it("uses an HttpOnly same-site cookie and Secure in production", () => {
    expect(NEGARIN_SESSION_COOKIE).toBe("negarin_session");
    expect(sessionCookieOptions({ NODE_ENV: "production" } as NodeJS.ProcessEnv)).toMatchObject({
      httpOnly: true, secure: true, sameSite: "lax", path: "/"
    });
    expect(sessionCookieOptions({ NODE_ENV: "development" } as NodeJS.ProcessEnv).secure).toBe(false);
  });

  it("adds the bearer token only on the server request and disables caching/redirect following", async () => {
    const fetchMock = vi.fn(async (_input: string | URL | Request, init?: RequestInit) => {
      const headers = new Headers(init?.headers);
      expect(headers.get("authorization")).toBe(`Bearer ${token}`);
      expect(headers.get("accept")).toBe("application/json");
      expect(headers.get("x-request-id")).toBe("trace-1");
      expect(init?.cache).toBe("no-store");
      expect(init?.redirect).toBe("manual");
      return new Response("{}", { status: 200, headers: { "content-type": "application/json" } });
    });
    vi.stubGlobal("fetch", fetchMock);

    const previous = process.env.NEGARIN_API_URL;
    process.env.NEGARIN_API_URL = "https://api.example.test";
    try {
      const response = await negarinFetch("/api/v1/identity/grants", token, {}, "trace-1");
      expect(response.status).toBe(200);
      expect(fetchMock).toHaveBeenCalledTimes(1);
    } finally {
      if (previous === undefined) delete process.env.NEGARIN_API_URL;
      else process.env.NEGARIN_API_URL = previous;
    }
  });
});
