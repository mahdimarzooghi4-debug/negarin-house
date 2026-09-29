import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { requestArtistApi } = vi.hoisted(() => ({ requestArtistApi: vi.fn() }));

vi.mock("./artist-api", () => ({
  isSameOriginRequest: (request: Request) => request.headers.get("origin") === new URL(request.url).origin,
  requestArtistApi
}));

import { POST as createUpload } from "./app/api/artist/products/[productId]/media/route";
import { PUT as uploadMedia } from "./app/api/artist/products/[productId]/media/[mediaId]/route";

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
