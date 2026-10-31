import { NextResponse, type NextRequest } from "next/server";
import { authenticatedProxy, jsonBody, rejectCrossOriginMutation } from "../../../../../server/api-proxy";
import { isUuid } from "../../../../../server/negarin-api";

type Context = { params: Promise<{ id: string }> };
async function target(request: NextRequest, context: Context) {
  const { id } = await context.params;
  return isUuid(id) && !request.nextUrl.search.length ? `/api/v1/customer/addresses/${id}` : null;
}
function invalid() { return NextResponse.json({ error: "invalid-request" }, { status: 400, headers: { "Cache-Control": "no-store" } }); }

export async function PUT(request: NextRequest, context: Context) {
  const crossOrigin = rejectCrossOriginMutation(request);
  if (crossOrigin) return crossOrigin;
  const url = await target(request, context);
  if (!url) return invalid();
  const body = await jsonBody(request, 16 * 1024);
  if (!body) return NextResponse.json({ error: "invalid-body" }, { status: 400, headers: { "Cache-Control": "no-store" } });
  return authenticatedProxy(request, url, { method: "PUT", body });
}

export async function DELETE(request: NextRequest, context: Context) {
  const crossOrigin = rejectCrossOriginMutation(request);
  if (crossOrigin) return crossOrigin;
  const url = await target(request, context);
  if (!url) return invalid();
  const body = await jsonBody(request, 4096);
  if (!body) return NextResponse.json({ error: "invalid-body" }, { status: 400, headers: { "Cache-Control": "no-store" } });
  return authenticatedProxy(request, url, { method: "DELETE", body });
}
