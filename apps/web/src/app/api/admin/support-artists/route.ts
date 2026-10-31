import { NextResponse, type NextRequest } from "next/server";
import { authenticatedProxy } from "../../../../server/api-proxy";

export async function GET(request: NextRequest) {
  const allowed = new Set(["q", "page", "pageSize"]);
  if ([...request.nextUrl.searchParams.keys()].some(key => !allowed.has(key)) || [...allowed].some(key => request.nextUrl.searchParams.getAll(key).length > 1)) return NextResponse.json({ error: "invalid-query" }, { status: 400, headers: { "Cache-Control": "no-store" } });
  const query = request.nextUrl.searchParams.get("q");
  if (query !== null && (query.trim().length < 2 || query.length > 120)) return NextResponse.json({ error: "invalid-query" }, { status: 400, headers: { "Cache-Control": "no-store" } });
  for (const [key, max] of [["page", 1000], ["pageSize", 50]] as const) {
    const value = request.nextUrl.searchParams.get(key);
    if (value !== null && (!/^[1-9][0-9]{0,3}$/.test(value) || Number(value) > max)) return NextResponse.json({ error: "invalid-query" }, { status: 400, headers: { "Cache-Control": "no-store" } });
  }
  return authenticatedProxy(request, `/api/v1/admin/support-artists${request.nextUrl.search}`);
}
