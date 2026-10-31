import { NextResponse, type NextRequest } from "next/server";
import { publicProxy } from "../../../../../../../server/api-proxy";
import { isUuid } from "../../../../../../../server/negarin-api";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string; imageId: string }> }) {
  const { id, imageId } = await params;
  if (!isUuid(id) || !isUuid(imageId) || request.nextUrl.search.length) {
    return NextResponse.json({ error: "invalid-id" }, { status: 400, headers: { "Cache-Control": "no-store" } });
  }
  return publicProxy(request, `/api/v1/catalog/storefronts/${id}/images/${imageId}`);
}
