import { NextResponse } from "next/server";
import { isSameOriginRequest, requestArtistApi } from "../../../../../../artist-api";

export const dynamic = "force-dynamic";

export async function POST(request: Request, context: { params: Promise<{ requestId: string; answer: string }> }) {
  if (!isSameOriginRequest(request)) return NextResponse.json(null, { status: 403 });
  const { requestId, answer } = await context.params;
  if (answer !== "accept" && answer !== "decline") return NextResponse.json(null, { status: 404 });
  const result = await requestArtistApi(`corporate-buyer/purchase-requests/${encodeURIComponent(requestId)}/${answer}`, {
    method: "POST"
  });
  return NextResponse.json(result.data, { status: result.status, headers: { "Cache-Control": "no-store" } });
}
