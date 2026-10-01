import { NextResponse } from "next/server";
import { isSameOriginRequest, readLimitedJsonBody, requestArtistApi } from "../../../../../../artist-api";

export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ productId: string }> };

export async function GET(_request: Request, { params }: RouteContext) {
  const { productId } = await params;
  const result = await requestArtistApi(`artist/products/${encodeURIComponent(productId)}/media`);
  return NextResponse.json(result.data, { status: result.status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request, { params }: RouteContext) {
  if (!isSameOriginRequest(request)) return NextResponse.json(null, { status: 403 });
  const parsed = await readLimitedJsonBody(request);
  if (parsed.kind !== "ready") return NextResponse.json(null, { status: parsed.kind === "too-large" ? 413 : 400 });
  const { productId } = await params;
  const result = await requestArtistApi(`artist/products/${encodeURIComponent(productId)}/media/upload-url`, {
    method: "POST",
    body: JSON.stringify(parsed.value)
  });
  if (result.status < 200 || result.status >= 300) {
    return NextResponse.json(result.data, { status: result.status, headers: { "Cache-Control": "no-store" } });
  }
  const media = result.data as { id?: unknown } | null;
  if (!media || typeof media.id !== "string") return NextResponse.json(null, { status: 502 });
  // Keep the signed storage URL on the server. The browser uploads through the same-origin handler below.
  return NextResponse.json({ id: media.id }, { status: 201, headers: { "Cache-Control": "no-store" } });
}
