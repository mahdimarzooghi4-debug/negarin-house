import { NextResponse, type NextRequest } from "next/server";
import { authenticatedProxy, jsonBody, rejectCrossOriginMutation } from "../../../../../../server/api-proxy";
import { isUuid } from "../../../../../../server/negarin-api";

type Context = { params: Promise<{ id: string }> };
async function paymentPath(request: NextRequest, context: Context) {
  const { id } = await context.params;
  return isUuid(id) && !request.nextUrl.search.length ? `/api/v1/customer/orders/${id}/payment` : null;
}
export async function GET(request: NextRequest, context: Context) {
  const path = await paymentPath(request, context);
  if (!path) return NextResponse.json({ error: "invalid-request" }, { status: 400, headers: { "Cache-Control": "no-store" } });
  return authenticatedProxy(request, path);
}
export async function POST(request: NextRequest, context: Context) {
  const crossOrigin = rejectCrossOriginMutation(request);
  if (crossOrigin) return crossOrigin;
  const path = await paymentPath(request, context);
  if (!path) return NextResponse.json({ error: "invalid-request" }, { status: 400, headers: { "Cache-Control": "no-store" } });
  const body = await jsonBody(request, 4096);
  if (!body) return NextResponse.json({ error: "invalid-body" }, { status: 400, headers: { "Cache-Control": "no-store" } });
  return authenticatedProxy(request, path, { method: "POST", body });
}
