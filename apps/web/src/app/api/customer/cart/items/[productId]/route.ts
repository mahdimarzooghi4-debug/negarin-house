import { NextResponse, type NextRequest } from "next/server";
import { authenticatedProxy, jsonBody, rejectCrossOriginMutation } from "../../../../../../server/api-proxy";
import { isUuid } from "../../../../../../server/negarin-api";

type Context = { params: Promise<{ productId: string }> };

async function path(request: NextRequest, context: Context) {
  const { productId } = await context.params;
  if (!isUuid(productId) || request.nextUrl.search.length > 0) {
    return { error: NextResponse.json({ error: "invalid-request" }, { status: 400, headers: { "Cache-Control": "no-store" } }) };
  }
  return { url: `/api/v1/customer/cart/items/${productId}` };
}

export async function PUT(request: NextRequest, context: Context) {
  const crossOrigin = rejectCrossOriginMutation(request);
  if (crossOrigin) return crossOrigin;
  const target = await path(request, context);
  if (target.error) return target.error;
  const body = await jsonBody(request, 4096);
  if (!body) return NextResponse.json({ error: "invalid-body" }, { status: 400, headers: { "Cache-Control": "no-store" } });
  return authenticatedProxy(request, target.url!, { method: "PUT", body });
}

export async function DELETE(request: NextRequest, context: Context) {
  const crossOrigin = rejectCrossOriginMutation(request);
  if (crossOrigin) return crossOrigin;
  const target = await path(request, context);
  if (target.error) return target.error;
  const body = await jsonBody(request, 4096);
  if (!body) return NextResponse.json({ error: "invalid-body" }, { status: 400, headers: { "Cache-Control": "no-store" } });
  return authenticatedProxy(request, target.url!, { method: "DELETE", body });
}
