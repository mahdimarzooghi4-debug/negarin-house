import { NextResponse } from "next/server";
import { isSameOriginRequest, requestArtistApi } from "../../../../../../artist-api";

export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ productId: string }> };

export async function GET(_request: Request, { params }: RouteContext) {
  const { productId } = await params;
  const result = await requestArtistApi(`artist/products/${encodeURIComponent(productId)}/media`);
  return NextResponse.json(result.data, { status: result.status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request, { params }: RouteContext) {
  if (!isSameOriginRequest(request)) return NextResponse.json(null, { status: 403 });
  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json(null, { status: 400 }); }
  const { productId } = await params;
  const result = await requestArtistApi(`artist/products/${encodeURIComponent(productId)}/media/upload-url`, {
    method: "POST",
    body: JSON.stringify(body)
  });
  if (result.status < 200 || result.status >= 300) {
    return NextResponse.json(result.data, { status: result.status, headers: { "Cache-Control": "no-store" } });
  }
  const media = result.data as { id?: unknown } | null;
  if (!media || typeof media.id !== "string") return NextResponse.json(null, { status: 502 });
  // Keep the signed storage URL on the server. The browser uploads through the same-origin handler below.
  return NextResponse.json({ id: media.id }, { status: 201, headers: { "Cache-Control": "no-store" } });
}
