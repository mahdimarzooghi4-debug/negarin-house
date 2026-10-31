import { NextResponse, type NextRequest } from "next/server";
import { authenticatedProxy } from "../../../../../../../../../server/api-proxy";
import { isUuid } from "../../../../../../../../../server/negarin-api";

type Context = { params: Promise<{ id: string; productId: string; imageId: string }> };
export async function GET(request: NextRequest, context: Context) {
  const { id, productId, imageId } = await context.params;
  if (!isUuid(id) || !isUuid(productId) || !isUuid(imageId) || request.nextUrl.search.length) {
    return NextResponse.json({ error: "invalid-request" }, { status: 400, headers: { "Cache-Control": "no-store" } });
  }
  return authenticatedProxy(request, `/api/v1/customer/orders/${id}/items/${productId}/images/${imageId}`);
}
