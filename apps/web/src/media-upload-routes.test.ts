import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { requestArtistApi } = vi.hoisted(() => ({ requestArtistApi: vi.fn() }));

vi.mock("./artist-api", async (importOriginal) => ({
  ...await importOriginal<typeof import("./artist-api")>(),
  requestArtistApi
}));

import { POST as createUpload } from "./app/api/artist/products/[productId]/media/route";
import { PUT as uploadMedia } from "./app/api/artist/products/[productId]/media/[mediaId]/route";
import { POST as createDeliverable } from "./app/api/service-partner/assignments/[assignmentId]/deliverables/route";
import { PUT as uploadDeliverable } from "./app/api/service-partner/assignments/[assignmentId]/deliverables/[deliverableId]/upload/route";
import { POST as respondToAssignment } from "./app/api/service-partner/assignments/[assignmentId]/response/route";

describe("Artist media same-origin routes", () => {
  const originalFetch = globalThis.fetch;

  beforeEach(() => requestArtistApi.mockReset());
  afterEach(() => { globalThis.fetch = originalFetch; });

  it("keeps the signed storage URL server-side when creating an upload", async () => {
    requestArtistApi.mockResolvedValue({
      status: 201,
      data: { id: "media-1", uploadUrl: "https://storage.invalid/signed-secret" }
    });
    const request = new Request("http://localhost/api/artist/products/product-1/media", {
      method: "POST",
      headers: { Origin: "http://localhost", "Content-Type": "application/json" },
      body: JSON.stringify({ contentType: "image/png", contentLength: 3 })
    });

    const response = await createUpload(request, { params: Promise.resolve({ productId: "product-1" }) });

    expect(response.status).toBe(201);
    expect(await response.json()).toEqual({ id: "media-1" });
    expect(requestArtistApi).toHaveBeenCalledWith("artist/products/product-1/media/upload-url", {
      method: "POST", body: JSON.stringify({ contentType: "image/png", contentLength: 3 })
    });
  });

  it("proxies file bytes to storage and completes the API upload", async () => {
    requestArtistApi
      .mockResolvedValueOnce({ status: 201, data: { uploadUrl: "https://storage.invalid/signed-secret" } })
      .mockResolvedValueOnce({ status: 201, data: { id: "media-1", status: "ready" } });
    const storageFetch = vi.fn(async () => new Response(null, { status: 200 }));
    globalThis.fetch = storageFetch as typeof fetch;
    const request = new Request("http://localhost/api/artist/products/product-1/media/media-1", {
      method: "PUT",
      headers: { Origin: "http://localhost", "Content-Type": "image/png" },
      body: new Uint8Array([1, 2, 3])
    });

    const response = await uploadMedia(request, {
      params: Promise.resolve({ productId: "product-1", mediaId: "media-1" })
    });

    expect(response.status).toBe(201);
    expect(await response.json()).toEqual({ id: "media-1", status: "ready" });
    expect(storageFetch).toHaveBeenCalledWith(
      new URL("https://storage.invalid/signed-secret"),
      expect.objectContaining({ method: "PUT", headers: { "Content-Type": "image/png" } })
    );
    expect(requestArtistApi).toHaveBeenNthCalledWith(1, "artist/products/product-1/media/media-1/upload-url", { method: "POST" });
    expect(requestArtistApi).toHaveBeenNthCalledWith(2, "artist/products/product-1/media/media-1/complete", { method: "POST" });
  });

  it("rejects a cross-origin write", async () => {
    const response = await uploadMedia(new Request("http://localhost/upload", {
      method: "PUT", headers: { Origin: "https://attacker.invalid", "Content-Type": "image/png" }, body: new Uint8Array([1])
    }), { params: Promise.resolve({ productId: "product-1", mediaId: "media-1" }) });

    expect(response.status).toBe(403);
    expect(requestArtistApi).not.toHaveBeenCalled();
  });

  it("rejects a file above the API upload limit before requesting a signed URL", async () => {
    const response = await uploadMedia(new Request("http://localhost/upload", {
      method: "PUT",
      headers: { Origin: "http://localhost", "Content-Type": "image/png" },
      body: new Uint8Array(10 * 1024 * 1024 + 1)
    }), { params: Promise.resolve({ productId: "product-1", mediaId: "media-1" }) });

    expect(response.status).toBe(413);
    expect(requestArtistApi).not.toHaveBeenCalled();
  });
});

describe("Service Partner deliverable same-origin routes", () => {
  const originalFetch = globalThis.fetch;

  beforeEach(() => requestArtistApi.mockReset());
  afterEach(() => { globalThis.fetch = originalFetch; });

  it("keeps the signed storage URL server-side when creating a deliverable", async () => {
    requestArtistApi.mockResolvedValue({
      status: 201,
      data: { id: "deliverable-1", uploadUrl: "https://storage.invalid/signed-secret" }
    });
    const request = new Request("http://localhost/api/service-partner/assignments/assignment-1/deliverables", {
      method: "POST",
      headers: { Origin: "http://localhost", "Content-Type": "application/json" },
      body: JSON.stringify({ fileName: "report.pdf", contentType: "application/pdf", contentLength: 3 })
    });

    const response = await createDeliverable(request, { params: Promise.resolve({ assignmentId: "assignment-1" }) });

    expect(response.status).toBe(201);
    expect(await response.json()).toEqual({ id: "deliverable-1" });
    expect(requestArtistApi).toHaveBeenCalledWith(
      "service-partner/assignments/assignment-1/deliverables/upload-url",
      { method: "POST", body: JSON.stringify({ fileName: "report.pdf", contentType: "application/pdf", contentLength: 3 }) }
    );
  });

  it("proxies deliverable bytes to storage and completes the API upload", async () => {
    requestArtistApi
      .mockResolvedValueOnce({ status: 201, data: { uploadUrl: "https://storage.invalid/signed-secret" } })
      .mockResolvedValueOnce({ status: 201, data: { id: "deliverable-1", status: "ready" } });
    const storageFetch = vi.fn(async () => new Response(null, { status: 200 }));
    globalThis.fetch = storageFetch as typeof fetch;
    const request = new Request("http://localhost/api/service-partner/assignments/assignment-1/deliverables/deliverable-1/upload", {
      method: "PUT",
      headers: { Origin: "http://localhost", "Content-Type": "application/pdf" },
      body: new Uint8Array([1, 2, 3])
    });

    const response = await uploadDeliverable(request, {
      params: Promise.resolve({ assignmentId: "assignment-1", deliverableId: "deliverable-1" })
    });

    expect(response.status).toBe(201);
    expect(await response.json()).toEqual({ id: "deliverable-1", status: "ready" });
    expect(storageFetch).toHaveBeenCalledWith(
      new URL("https://storage.invalid/signed-secret"),
      expect.objectContaining({ method: "PUT", headers: { "Content-Type": "application/pdf" } })
    );
    expect(requestArtistApi).toHaveBeenNthCalledWith(
      1,
      "service-partner/assignments/assignment-1/deliverables/deliverable-1/upload-url",
      { method: "POST" }
    );
    expect(requestArtistApi).toHaveBeenNthCalledWith(
      2,
      "service-partner/assignments/assignment-1/deliverables/deliverable-1/complete",
      { method: "POST" }
    );
  });

  it("rejects cross-origin and oversized deliverable writes before calling the API", async () => {
    const crossOrigin = await uploadDeliverable(new Request("http://localhost/upload", {
      method: "PUT", headers: { Origin: "https://attacker.invalid", "Content-Type": "application/pdf" }, body: new Uint8Array([1])
    }), { params: Promise.resolve({ assignmentId: "assignment-1", deliverableId: "deliverable-1" }) });
    expect(crossOrigin.status).toBe(403);

    const oversized = await uploadDeliverable(new Request("http://localhost/upload", {
      method: "PUT", headers: { Origin: "http://localhost", "Content-Type": "application/pdf" },
      body: new Uint8Array(10 * 1024 * 1024 + 1)
    }), { params: Promise.resolve({ assignmentId: "assignment-1", deliverableId: "deliverable-1" }) });
    expect(oversized.status).toBe(413);
    expect(requestArtistApi).not.toHaveBeenCalled();
  });
});

describe("Service Partner assignment response same-origin route", () => {
  beforeEach(() => requestArtistApi.mockReset());

  it("forwards the response through the authenticated API boundary", async () => {
    requestArtistApi.mockResolvedValue({ status: 201, data: { assignmentId: "assignment-1", responseStatus: "accepted" } });
    const request = new Request("http://localhost/api/service-partner/assignments/assignment-1/response", {
      method: "POST",
      headers: { Origin: "http://localhost", "Content-Type": "application/json" },
      body: JSON.stringify({ response: "accepted" })
    });

    const response = await respondToAssignment(request, { params: Promise.resolve({ assignmentId: "assignment-1" }) });

    expect(response.status).toBe(201);
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(await response.json()).toEqual({ assignmentId: "assignment-1", responseStatus: "accepted" });
    expect(requestArtistApi).toHaveBeenCalledWith("service-partner/assignments/assignment-1/response", {
      method: "POST", body: JSON.stringify({ response: "accepted" })
    });
  });

  it("rejects cross-origin and oversized writes before reaching the API", async () => {
    const crossOrigin = await respondToAssignment(new Request("http://localhost/response", {
      method: "POST", headers: { Origin: "https://attacker.invalid" }, body: JSON.stringify({ response: "accepted" })
    }), { params: Promise.resolve({ assignmentId: "assignment-1" }) });
    expect(crossOrigin.status).toBe(403);

    const oversized = await respondToAssignment(new Request("http://localhost/response", {
      method: "POST", headers: { Origin: "http://localhost" }, body: JSON.stringify({ response: "accepted", padding: "x".repeat(70_000) })
    }), { params: Promise.resolve({ assignmentId: "assignment-1" }) });
    expect(oversized.status).toBe(413);
    expect(requestArtistApi).not.toHaveBeenCalled();
  });
});
