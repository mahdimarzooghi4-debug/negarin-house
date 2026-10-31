import { NextResponse, type NextRequest } from "next/server";
import { authenticatedProxy, jsonBody, rejectCrossOriginMutation } from "../../../../server/api-proxy";

function rejectQuery(request: NextRequest) {
  return request.nextUrl.search.length > 0
    ? NextResponse.json({ error: "invalid-query" }, { status: 400, headers: { "Cache-Control": "no-store" } })
    : null;
}

export async function GET(request: NextRequest) {
  const invalid = rejectQuery(request);
  if (invalid) return invalid;
  return authenticatedProxy(request, "/api/v1/customer/cart");
}

export async function DELETE(request: NextRequest) {
  const crossOrigin = rejectCrossOriginMutation(request);
  if (crossOrigin) return crossOrigin;
  const invalid = rejectQuery(request);
  if (invalid) return invalid;
  const body = await jsonBody(request, 4096);
  if (!body) return NextResponse.json({ error: "invalid-body" }, { status: 400, headers: { "Cache-Control": "no-store" } });
  return authenticatedProxy(request, "/api/v1/customer/cart", { method: "DELETE", body });
}
