import { NextResponse, type NextRequest } from "next/server";
import { authenticatedProxy, jsonBody, rejectCrossOriginMutation } from "../../../../../../../../server/api-proxy";
import { isUuid } from "../../../../../../../../server/negarin-api";

type Context = { params: Promise<{ id: string; shipmentId: string }> };
export async function POST(request: NextRequest, context: Context) {
  const crossOrigin = rejectCrossOriginMutation(request);
  if (crossOrigin) return crossOrigin;
  const { id, shipmentId } = await context.params;
  if (!isUuid(id) || !isUuid(shipmentId) || request.nextUrl.search.length) return NextResponse.json({ error: "invalid-request" }, { status: 400, headers: { "Cache-Control": "no-store" } });
  const body = await jsonBody(request, 4096);
  if (!body) return NextResponse.json({ error: "invalid-body" }, { status: 400, headers: { "Cache-Control": "no-store" } });
  return authenticatedProxy(request, `/api/v1/customer/orders/${id}/shipments/${shipmentId}/receipt`, { method: "POST", body });
}
