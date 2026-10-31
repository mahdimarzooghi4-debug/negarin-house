import { NextResponse, type NextRequest } from "next/server";
import { authenticatedProxy } from "../../../../server/api-proxy";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  if ([...params.keys()].some(key => !["page", "pageSize"].includes(key)) || params.getAll("page").length > 1 || params.getAll("pageSize").length > 1 ||
    [...params.values()].some(value => !/^[1-9][0-9]{0,3}$/.test(value)) ||
    (params.has("page") && Number(params.get("page")) > 1000) || (params.has("pageSize") && Number(params.get("pageSize")) > 50)) {
    return NextResponse.json({ error: "invalid-query" }, { status: 400, headers: { "Cache-Control": "no-store" } });
  }
  return authenticatedProxy(request, "/api/v1/customer/favorites" + request.nextUrl.search);
}
