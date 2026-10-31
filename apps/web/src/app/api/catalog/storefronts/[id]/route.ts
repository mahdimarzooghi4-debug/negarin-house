import { NextResponse, type NextRequest } from "next/server";
import { publicProxy } from "../../../../../server/api-proxy";
import { isUuid } from "../../../../../server/negarin-api";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const allowed = new Set(["page", "pageSize"]);
  if (!isUuid(id) || [...request.nextUrl.searchParams.keys()].some(key => !allowed.has(key)) ||
      [...allowed].some(key => request.nextUrl.searchParams.getAll(key).length > 1)) {
    return NextResponse.json({ error: "invalid-query" }, { status: 400, headers: { "Cache-Control": "no-store" } });
  }
  for (const [key, maximum] of [["page", 1000], ["pageSize", 50]] as const) {
    const value = request.nextUrl.searchParams.get(key);
    if (value !== null && (!/^[1-9][0-9]{0,3}$/.test(value) || Number(value) > maximum)) {
      return NextResponse.json({ error: "invalid-query" }, { status: 400, headers: { "Cache-Control": "no-store" } });
    }
  }
  return publicProxy(request, `/api/v1/catalog/storefronts/${id}${request.nextUrl.search}`);
}
