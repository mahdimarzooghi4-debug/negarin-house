import { NextResponse, type NextRequest } from "next/server";
import { authenticatedProxy, jsonBody, rejectCrossOriginMutation } from "../../../../../server/api-proxy";
import { isUuid } from "../../../../../server/negarin-api";

type Context = { params: Promise<{ productId: string }> };
async function target(request: NextRequest, context: Context) {
  const { productId } = await context.params;
  return isUuid(productId) && !request.nextUrl.search.length ? `/api/v1/customer/favorites/${productId}` : null;
}
function invalid() { return NextResponse.json({ error: "invalid-request" }, { status: 400, headers: { "Cache-Control": "no-store" } }); }

export async function GET(request: NextRequest, context: Context) {
  const url = await target(request, context);
  if (!url) return invalid();
  return authenticatedProxy(request, url);
}

export async function PUT(request: NextRequest, context: Context) {
  const crossOrigin = rejectCrossOriginMutation(request);
  if (crossOrigin) return crossOrigin;
  const url = await target(request, context);
  if (!url) return invalid();
  const body = await jsonBody(request, 4096);
  if (!body) return NextResponse.json({ error: "invalid-body" }, { status: 400, headers: { "Cache-Control": "no-store" } });
  return authenticatedProxy(request, url, { method: "PUT", body });
}

export async function DELETE(request: NextRequest, context: Context) {
  const crossOrigin = rejectCrossOriginMutation(request);
  if (crossOrigin) return crossOrigin;
  const url = await target(request, context);
  if (!url) return invalid();
  return authenticatedProxy(request, url, { method: "DELETE" });
}
