import { NextResponse, type NextRequest } from "next/server";
import { authenticatedProxy } from "../../../../../../server/api-proxy";
import { isUuid } from "../../../../../../server/negarin-api";

export async function GET(request: NextRequest, { params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params;
  if (!isUuid(orderId) || request.nextUrl.search) return NextResponse.json({ error: "invalid-id" }, { status: 400, headers: { "Cache-Control": "no-store" } });
  return authenticatedProxy(request, `/api/v1/artist/finance/orders/${orderId}`);
}
