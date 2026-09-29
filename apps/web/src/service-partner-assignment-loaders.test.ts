import { afterEach, describe, expect, it, vi } from "vitest";
import { loadServicePartnerAssignment, loadServicePartnerAssignments, loadStaffServiceAssignmentOptions } from "./artist-api";

vi.mock("next/headers", () => ({
  cookies: async () => ({ get: () => ({ value: "opaque-session-token" }) })
}));

describe("Service Partner page authorization states", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("distinguishes a missing session from a role or organization denial on the inbox", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(null, { status: 401 })));
    await expect(loadServicePartnerAssignments()).resolves.toEqual({ kind: "connection-required" });

    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(null, { status: 403 })));
    await expect(loadServicePartnerAssignments()).resolves.toEqual({ kind: "access-denied" });
  });

  it("keeps forbidden and concealed assignment details distinct", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(null, { status: 403 })));
    await expect(loadServicePartnerAssignment("assignment-id")).resolves.toEqual({ kind: "access-denied" });

    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(null, { status: 404 })));
    await expect(loadServicePartnerAssignment("assignment-id")).resolves.toEqual({ kind: "not-found" });
  });

  it("distinguishes missing login from missing services permission for staff options", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(null, { status: 401 })));
    await expect(loadStaffServiceAssignmentOptions()).resolves.toEqual({ kind: "connection-required" });

    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(null, { status: 403 })));
    await expect(loadStaffServiceAssignmentOptions()).resolves.toEqual({ kind: "access-denied" });
  });
});
