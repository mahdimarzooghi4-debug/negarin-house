import { beforeEach, describe, expect, it, vi } from "vitest";

const { requestArtistApi } = vi.hoisted(() => ({ requestArtistApi: vi.fn() }));

vi.mock("./artist-api", () => ({
  isSameOriginRequest: (request: Request) => request.headers.get("origin") === new URL(request.url).origin,
  readLimitedJsonBody: async (request: Request) => {
    try { return { kind: "ready", value: await request.json() as unknown }; }
    catch { return { kind: "invalid" }; }
  },
  requestArtistApi
}));

import { GET as getOptions } from "./app/api/admin/service-assignments/options/route";
import { POST as createAssignment } from "./app/api/admin/service-assignments/route";
import { POST as createServiceRequest } from "./app/api/admin/service-requests/route";
import { GET as getSubmissions } from "./app/api/admin/service-deliverables/route";
import { GET as getArtistRequests, POST as createArtistRequest } from "./app/api/artist/service-requests/route";

describe("staff service assignment same-origin routes", () => {
  beforeEach(() => requestArtistApi.mockReset());

  it("loads real API choices without caching", async () => {
    requestArtistApi.mockResolvedValue({ status: 200, data: { requests: [], organizations: [] } });
    const response = await getOptions();

    expect(response.status).toBe(200);
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(await response.json()).toEqual({ requests: [], organizations: [] });
    expect(requestArtistApi).toHaveBeenCalledWith("admin/service-assignments/options");
  });

  it("loads submitted service deliverables through the no-store staff boundary", async () => {
    const items = [{ deliverableId: "deliverable-1", fileName: "packing-list.pdf" }];
    requestArtistApi.mockResolvedValue({ status: 200, data: items });
    const response = await getSubmissions();
    expect(response.status).toBe(200);
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(await response.json()).toEqual(items);
    expect(requestArtistApi).toHaveBeenCalledWith("admin/service-deliverables");
  });

  it("loads and submits Artist service requests through the scoped same-origin boundary", async () => {
    const items = [{ requestId: "request-1", title: "عکاسی محصول", assignedAt: null }];
    requestArtistApi.mockResolvedValueOnce({ status: 200, data: items });
    const list = await getArtistRequests();
    expect(list.status).toBe(200);
    expect(list.headers.get("cache-control")).toBe("no-store");
    expect(await list.json()).toEqual(items);
    expect(requestArtistApi).toHaveBeenCalledWith("artist/service-requests");

    requestArtistApi.mockReset().mockResolvedValue({ status: 201, data: items[0] });
    const body = { title: "عکاسی محصول", description: "تصویرهای کاتالوگ" };
    const crossOrigin = await createArtistRequest(new Request("http://localhost/api/artist/service-requests", {
      method: "POST", headers: { Origin: "https://attacker.invalid" }, body: JSON.stringify(body)
    }));
    expect(crossOrigin.status).toBe(403);
    expect(requestArtistApi).not.toHaveBeenCalled();

    const response = await createArtistRequest(new Request("http://localhost/api/artist/service-requests", {
      method: "POST", headers: { Origin: "http://localhost", "Content-Type": "application/json" }, body: JSON.stringify(body)
    }));
    expect(response.status).toBe(201);
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(await response.json()).toEqual(items[0]);
    expect(requestArtistApi).toHaveBeenCalledWith("artist/service-requests", {
      method: "POST", body: JSON.stringify(body)
    });
  });

  it("forwards assignment writes only from same-origin requests", async () => {
    requestArtistApi.mockResolvedValue({ status: 201, data: { assignmentId: "assignment-1" } });
    const body = { requestId: "request-1", partnerOrganizationId: "organization-1" };
    const crossOrigin = await createAssignment(new Request("http://localhost/api/admin/service-assignments", {
      method: "POST", headers: { Origin: "https://attacker.invalid" }, body: JSON.stringify(body)
    }));
    expect(crossOrigin.status).toBe(403);
    expect(requestArtistApi).not.toHaveBeenCalled();

    const response = await createAssignment(new Request("http://localhost/api/admin/service-assignments", {
      method: "POST", headers: { Origin: "http://localhost", "Content-Type": "application/json" }, body: JSON.stringify(body)
    }));
    expect(response.status).toBe(201);
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(await response.json()).toEqual({ assignmentId: "assignment-1" });
    expect(requestArtistApi).toHaveBeenCalledWith("admin/service-assignments", {
      method: "POST", body: JSON.stringify(body)
    });
  });

  it("forwards service request writes only from same-origin requests", async () => {
    requestArtistApi.mockResolvedValue({ status: 201, data: { requestId: "request-1" } });
    const body = { title: "بسته‌بندی آثار", summary: "شرح برای شریک خدماتی" };
    const crossOrigin = await createServiceRequest(new Request("http://localhost/api/admin/service-requests", {
      method: "POST", headers: { Origin: "https://attacker.invalid" }, body: JSON.stringify(body)
    }));
    expect(crossOrigin.status).toBe(403);
    expect(requestArtistApi).not.toHaveBeenCalled();

    const response = await createServiceRequest(new Request("http://localhost/api/admin/service-requests", {
      method: "POST", headers: { Origin: "http://localhost", "Content-Type": "application/json" }, body: JSON.stringify(body)
    }));
    expect(response.status).toBe(201);
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(await response.json()).toEqual({ requestId: "request-1" });
    expect(requestArtistApi).toHaveBeenCalledWith("admin/service-requests", {
      method: "POST", body: JSON.stringify(body)
    });
  });

  it("rejects oversized or malformed browser input before calling the API", async () => {
    const oversized = await createAssignment(new Request("http://localhost/api/admin/service-assignments", {
      method: "POST", headers: { Origin: "http://localhost", "Content-Type": "application/json" },
      body: JSON.stringify({ value: "x".repeat(4100) })
    }));
    expect(oversized.status).toBe(413);

    const malformed = await createAssignment(new Request("http://localhost/api/admin/service-assignments", {
      method: "POST", headers: { Origin: "http://localhost", "Content-Type": "application/json" }, body: "{"
    }));
    expect(malformed.status).toBe(400);
    expect(requestArtistApi).not.toHaveBeenCalled();
  });
});
