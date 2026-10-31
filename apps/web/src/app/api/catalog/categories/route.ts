import { publicProxy } from "../../../../server/api-proxy";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  if (request.nextUrl.search.length) return Response.json({ error: "invalid-query" }, { status: 400, headers: { "Cache-Control": "no-store" } });
  return publicProxy(request, "/api/v1/catalog/categories");
}
