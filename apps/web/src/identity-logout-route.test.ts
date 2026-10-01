import { beforeEach, describe, expect, it, vi } from "vitest";

const { requestArtistApi, deleteCookie } = vi.hoisted(() => ({
  requestArtistApi: vi.fn(),
  deleteCookie: vi.fn()
}));

vi.mock("./artist-api", () => ({
  isSameOriginRequest: (request: Request) => request.headers.get("origin") === new URL(request.url).origin,
  requestArtistApi
}));

vi.mock("next/headers", () => ({
  cookies: async () => ({ delete: deleteCookie })
}));

import { POST as logout } from "./app/api/identity/logout/route";

describe("browser logout route", () => {
  beforeEach(() => {
    requestArtistApi.mockReset();
    deleteCookie.mockReset();
  });

  function request(origin = "http://localhost") {
    return new Request("http://localhost/api/identity/logout", {
      method: "POST",
      headers: { Origin: origin }
    });
  }

  it("revokes the bearer session and clears the browser cookie", async () => {
    requestArtistApi.mockResolvedValue({ status: 204, data: null });

    const response = await logout(request());

    expect(response.status).toBe(204);
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(requestArtistApi).toHaveBeenCalledWith("identity/logout", { method: "POST" });
    expect(deleteCookie).toHaveBeenCalledWith("negarin_session");
  });

  it("clears a stale cookie when the API reports no valid session", async () => {
    requestArtistApi.mockResolvedValue({ status: 401, data: null });

    const response = await logout(request());

    expect(response.status).toBe(204);
    expect(deleteCookie).toHaveBeenCalledWith("negarin_session");
  });

  it("rejects cross-origin logout without revoking or clearing anything", async () => {
    const response = await logout(request("https://attacker.invalid"));

    expect(response.status).toBe(403);
    expect(requestArtistApi).not.toHaveBeenCalled();
    expect(deleteCookie).not.toHaveBeenCalled();
  });

  it("preserves the cookie when the API is unavailable so logout can be retried", async () => {
    requestArtistApi.mockResolvedValue({ status: 503, data: null });

    const response = await logout(request());

    expect(response.status).toBe(503);
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(deleteCookie).not.toHaveBeenCalled();
  });
});
