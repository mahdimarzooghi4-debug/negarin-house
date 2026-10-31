import { NextResponse, type NextRequest } from "next/server";
import { authenticatedProxy, jsonBody, rejectCrossOriginMutation } from "../../../../server/api-proxy";

export async function GET(request: NextRequest) {
  if ([...request.nextUrl.searchParams.keys()].some(key => key !== "includeArchived") ||
    request.nextUrl.searchParams.getAll("includeArchived").length > 1 ||
    (request.nextUrl.searchParams.has("includeArchived") && !["true", "false"].includes(request.nextUrl.searchParams.get("includeArchived")!))) {
    return NextResponse.json({ error: "invalid-query" }, { status: 400, headers: { "Cache-Control": "no-store" } });
  }
  return authenticatedProxy(request, "/api/v1/artist/products" + request.nextUrl.search);
}

export async function POST(request: NextRequest) {
  const crossOrigin = rejectCrossOriginMutation(request);
  if (crossOrigin) return crossOrigin;
  const body = await jsonBody(request, 64 * 1024);
  if (!body) return NextResponse.json({ error: "invalid-body" }, { status: 400, headers: { "Cache-Control": "no-store" } });
  return authenticatedProxy(request, "/api/v1/artist/products", { method: "POST", body });
}
