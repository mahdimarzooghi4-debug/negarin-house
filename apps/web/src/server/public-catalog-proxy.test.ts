import {afterEach, describe, expect, it, vi} from "vitest";
import {NextRequest} from "next/server";
import {GET as list} from "../app/api/catalog/products/route";
import {GET as detail} from "../app/api/catalog/products/[id]/route";
import {GET as image} from "../app/api/catalog/products/[id]/images/[imageId]/route";

const id = "00000000-0000-4000-8000-000000000001";
afterEach(() => vi.unstubAllGlobals());

describe("public customer catalog routes", () => {
  it("forwards search without forwarding browser credentials or upstream cookies", async () => {
    const upstream = vi.fn(async (_url: string, init: RequestInit) => {
      expect(new Headers(init.headers).get("authorization")).toBeNull();
      expect(new Headers(init.headers).get("cookie")).toBeNull();
      expect(init.cache).toBe("no-store");
      expect(init.redirect).toBe("manual");
      return new Response('{"items":[]}', {headers: {"content-type":"application/json", "set-cookie":"private=value"}});
    });
    vi.stubGlobal("fetch", upstream);
    const response = await list(new NextRequest("https://web.example/api/catalog/products?q=art&page=2", {
      headers: {authorization:"Bearer secret", cookie:"negarin_session=secret"}
    }));
    expect(String(upstream.mock.calls[0]![0])).toContain("/api/v1/catalog/products?q=art&page=2");
    expect(response.headers.get("set-cookie")).toBeNull();
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(await response.json()).toEqual({items:[]});
  });

  it("validates resource IDs before reaching the API", async () => {
    const upstream = vi.fn();
    vi.stubGlobal("fetch", upstream);
    const request = new Request("https://web.example");
    expect((await detail(request, {params:Promise.resolve({id:"invalid"})})).status).toBe(400);
    expect((await image(request, {params:Promise.resolve({id,imageId:"invalid"})})).status).toBe(400);
    expect(upstream).not.toHaveBeenCalled();
  });

  it("uses the public detail and image paths and preserves not-found responses", async () => {
    const upstream = vi.fn(async (_url: string) => new Response('{"error":"not-found"}', {status:404}));
    vi.stubGlobal("fetch", upstream);
    const request = new Request("https://web.example");
    expect((await detail(request, {params:Promise.resolve({id})})).status).toBe(404);
    expect((await image(request, {params:Promise.resolve({id,imageId:id})})).status).toBe(404);
    expect(String(upstream.mock.calls[0]![0])).toContain(`/api/v1/catalog/products/${id}`);
    expect(String(upstream.mock.calls[1]![0])).toContain(`/api/v1/catalog/products/${id}/images/${id}`);
  });

  it("returns a retryable unavailable response for transport failures and redirects", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));
    const request = new Request("https://web.example");
    expect((await detail(request, {params:Promise.resolve({id})})).status).toBe(502);
    vi.stubGlobal("fetch", vi.fn(async () => new Response(null, {status:302,headers:{location:"https://other.example"}})));
    expect((await detail(request, {params:Promise.resolve({id})})).status).toBe(502);
  });
});
