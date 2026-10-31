import { NextResponse, type NextRequest } from "next/server";
import { authenticatedProxy } from "../../../../../../../../server/api-proxy";
import { isUuid } from "../../../../../../../../server/negarin-api";

export async function GET(request: NextRequest, { params }: { params: Promise<{ orderId: string; artistUserId: string }> }) {
  const { orderId, artistUserId } = await params;
  if (!isUuid(orderId) || !isUuid(artistUserId) || request.nextUrl.search) return NextResponse.json({ error: "invalid-id" }, { status: 400, headers: { "Cache-Control": "no-store" } });
  return authenticatedProxy(request, `/api/v1/admin/domestic-finance/orders/${orderId}/artists/${artistUserId}`);
}
