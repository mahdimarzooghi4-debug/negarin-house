import { NextResponse, type NextRequest } from "next/server";
import { authenticatedProxy, jsonBody, rejectCrossOriginMutation } from "../../../../../server/api-proxy";
import { isUuid } from "../../../../../server/negarin-api";

type Context = { params: Promise<{ shipmentId: string }> };
export async function GET(request: NextRequest, context: Context) {
  const { shipmentId } = await context.params;
  if (!isUuid(shipmentId) || request.nextUrl.search.length) return NextResponse.json({ error: "invalid-id" }, { status: 400, headers: { "Cache-Control": "no-store" } });
  return authenticatedProxy(request, `/api/v1/admin/shipment-issues/${shipmentId}`);
}
export async function POST(request: NextRequest, context: Context) {
  const { shipmentId } = await context.params;
  if (!isUuid(shipmentId) || request.nextUrl.search.length) return NextResponse.json({ error: "invalid-id" }, { status: 400, headers: { "Cache-Control": "no-store" } });
  const crossOrigin = rejectCrossOriginMutation(request);
  if (crossOrigin) return crossOrigin;
  const body = await jsonBody(request, 8 * 1024);
  if (!body) return NextResponse.json({ error: "invalid-body" }, { status: 400, headers: { "Cache-Control": "no-store" } });
  return authenticatedProxy(request, `/api/v1/admin/shipment-issues/${shipmentId}/status`, { method: "POST", body });
}
