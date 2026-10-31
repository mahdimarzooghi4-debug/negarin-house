import { NextResponse, type NextRequest } from "next/server";
import { authenticatedProxy, jsonBody, rejectCrossOriginMutation } from "../../../../server/api-proxy";

export async function GET(request: NextRequest) {
  if (request.nextUrl.search.length) return NextResponse.json({ error: "invalid-query" }, { status: 400, headers: { "Cache-Control": "no-store" } });
  return authenticatedProxy(request, "/api/v1/customer/addresses");
}

export async function POST(request: NextRequest) {
  const crossOrigin = rejectCrossOriginMutation(request);
  if (crossOrigin) return crossOrigin;
  if (request.nextUrl.search.length) return NextResponse.json({ error: "invalid-query" }, { status: 400, headers: { "Cache-Control": "no-store" } });
  const body = await jsonBody(request, 16 * 1024);
  if (!body) return NextResponse.json({ error: "invalid-body" }, { status: 400, headers: { "Cache-Control": "no-store" } });
  return authenticatedProxy(request, "/api/v1/customer/addresses", { method: "POST", body });
}
