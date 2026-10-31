import { NextResponse, type NextRequest } from "next/server";
import { authenticatedProxy } from "../../../../../server/api-proxy";

export async function GET(request: NextRequest) {
  if (request.nextUrl.search.length) return NextResponse.json({ error: "invalid-query" }, { status: 400, headers: { "Cache-Control": "no-store" } });
  return authenticatedProxy(request, "/api/v1/artist/growth/levels");
}
