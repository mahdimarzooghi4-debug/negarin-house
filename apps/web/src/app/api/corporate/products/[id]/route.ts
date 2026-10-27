import { NextResponse, type NextRequest } from "next/server";
import { authenticatedProxy } from "../../../../../server/api-proxy";
import { isUuid } from "../../../../../server/negarin-api";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!isUuid(id)) return NextResponse.json({ error: "invalid-id" }, { status: 400, headers: { "Cache-Control": "no-store" } });
  return authenticatedProxy(request, `/api/v1/corporate/products/${id}`);
}
