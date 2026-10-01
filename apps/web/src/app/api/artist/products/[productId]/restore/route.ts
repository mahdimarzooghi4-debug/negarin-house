import { NextResponse } from "next/server";
import { isSameOriginRequest, requestArtistApi } from "../../../../../../artist-api";

export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ productId: string }> };

export async function POST(request: Request, { params }: RouteContext) {
  if (!isSameOriginRequest(request)) return NextResponse.json(null, { status: 403 });
  const { productId } = await params;
  const result = await requestArtistApi(`artist/products/${encodeURIComponent(productId)}/restore`, { method: "POST" });
  return NextResponse.json(result.data, { status: result.status, headers: { "Cache-Control": "no-store" } });
}
