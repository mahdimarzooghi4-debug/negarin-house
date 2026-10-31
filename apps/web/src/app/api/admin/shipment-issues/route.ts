import { NextResponse, type NextRequest } from "next/server";
import { authenticatedProxy } from "../../../../server/api-proxy";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const allowed = new Set(["status", "page", "pageSize"]);
  const seen = new Set<string>();
  for (const [key] of params) {
    if (!allowed.has(key) || seen.has(key)) return NextResponse.json({ error: "invalid-query" }, { status: 400, headers: { "Cache-Control": "no-store" } });
    seen.add(key);
  }
  if (params.has("status") && !["open", "in_review", "closed"].includes(params.get("status")!)) return NextResponse.json({ error: "invalid-query" }, { status: 400, headers: { "Cache-Control": "no-store" } });
  return authenticatedProxy(request, `/api/v1/admin/shipment-issues${params.size ? `?${params.toString()}` : ""}`);
}
