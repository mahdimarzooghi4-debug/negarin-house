import { NextResponse, type NextRequest } from "next/server";
import { authenticatedProxy, jsonBody } from "../../../../server/api-proxy";

export async function GET(request: NextRequest) {
  return authenticatedProxy(request, "/api/v1/corporate/purchase-requests" + request.nextUrl.search);
}

export async function POST(request: NextRequest) {
  const body = await jsonBody(request);
  if (body === null) return NextResponse.json({ error: "invalid-body" }, { status: 400, headers: { "Cache-Control": "no-store" } });
  return authenticatedProxy(request, "/api/v1/corporate/purchase-requests", { method: "POST", body });
}
