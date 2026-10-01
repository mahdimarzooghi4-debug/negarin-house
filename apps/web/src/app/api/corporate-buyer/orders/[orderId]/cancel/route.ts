import { NextResponse } from "next/server";
import { isSameOriginRequest, requestArtistApi } from "../../../../../../artist-api";

export const dynamic = "force-dynamic";

export async function POST(request: Request, { params }: { params: Promise<{ orderId: string }> }) {
  if (!isSameOriginRequest(request)) return NextResponse.json(null, { status: 403 });
  const { orderId } = await params;
  const result = await requestArtistApi(`corporate-buyer/orders/${encodeURIComponent(orderId)}/cancel`, { method: "POST" });
  return NextResponse.json(result.data, { status: result.status, headers: { "Cache-Control": "no-store" } });
}
