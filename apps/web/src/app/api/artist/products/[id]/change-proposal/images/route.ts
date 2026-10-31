import { NextResponse, type NextRequest } from "next/server";
import { authenticatedProxy, jsonBody, rejectCrossOriginMutation } from "../../../../../../../server/api-proxy";
import { isUuid } from "../../../../../../../server/negarin-api";

type Context = { params: Promise<{ id: string }> };
async function prepare(request: NextRequest, context: Context) {
  const { id } = await context.params;
  if (!isUuid(id) || request.nextUrl.search) return { response: NextResponse.json({ error: "invalid-id" }, { status: 400, headers: { "Cache-Control": "no-store" } }) };
  const crossOrigin = rejectCrossOriginMutation(request);
  if (crossOrigin) return { response: crossOrigin };
  const body = await jsonBody(request, 8 * 1024 * 1024);
  if (!body) return { response: NextResponse.json({ error: "invalid-body" }, { status: 400, headers: { "Cache-Control": "no-store" } }) };
  return { id, body };
}
export async function POST(request: NextRequest, context: Context) {
  const result = await prepare(request, context);
  if ("response" in result) return result.response;
  return authenticatedProxy(request, `/api/v1/artist/products/${result.id}/change-proposal/images`, { method: "POST", body: result.body });
}
export async function PATCH(request: NextRequest, context: Context) {
  const result = await prepare(request, context);
  if ("response" in result) return result.response;
  return authenticatedProxy(request, `/api/v1/artist/products/${result.id}/change-proposal/images`, { method: "PATCH", body: result.body });
}
