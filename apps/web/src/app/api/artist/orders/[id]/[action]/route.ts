import { NextResponse, type NextRequest } from "next/server";
import { authenticatedProxy, jsonBody, rejectCrossOriginMutation } from "../../../../../../server/api-proxy";
import { isUuid } from "../../../../../../server/negarin-api";

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string; action: string }> }) {
  const { id, action } = await params;
  if (!isUuid(id) || !["preparation", "shipment"].includes(action) || request.nextUrl.search.length) return NextResponse.json({ error: "not-found" }, { status: 404, headers: { "Cache-Control": "no-store" } });
  const crossOrigin = rejectCrossOriginMutation(request);
  if (crossOrigin) return crossOrigin;
  const body = await jsonBody(request, 8 * 1024);
  if (!body) return NextResponse.json({ error: "invalid-body" }, { status: 400, headers: { "Cache-Control": "no-store" } });
  return authenticatedProxy(request, `/api/v1/artist/orders/${id}/${action}`, { method: "POST", body });
}
