import { NextResponse, type NextRequest } from "next/server";
import { authenticatedProxy } from "../../../../server/api-proxy";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const cursors = params.getAll("cursor");
  if ([...params.keys()].some(key => key !== "cursor") || cursors.length > 1 || cursors.some(cursor => cursor.length > 256)) {
    return NextResponse.json({ error: "invalid-query" }, { status: 400, headers: { "Cache-Control": "no-store" } });
  }
  const query = cursors.length ? `?${new URLSearchParams({ cursor: cursors[0]! }).toString()}` : "";
  return authenticatedProxy(request, `/api/v1/admin/product-reviews${query}`);
}
