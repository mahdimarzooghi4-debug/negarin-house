import { NextResponse, type NextRequest } from "next/server";
import { authenticatedProxy, jsonBody } from "../../../../../../server/api-proxy";
import { isUuid } from "../../../../../../server/negarin-api";

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!isUuid(id)) return NextResponse.json({ error: "invalid-id" }, { status: 400, headers: { "Cache-Control": "no-store" } });
  const body = await jsonBody(request, 4 * 1024);
  if (body === null) return NextResponse.json({ error: "invalid-body" }, { status: 400, headers: { "Cache-Control": "no-store" } });
  return authenticatedProxy(request, `/api/v1/corporate/purchase-requests/${id}/submit`, { method: "POST", body });
}
