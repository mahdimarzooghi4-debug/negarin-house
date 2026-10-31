import { NextResponse, type NextRequest } from "next/server";
import { authenticatedProxy } from "../../../../../../../server/api-proxy";
import { isUuid } from "../../../../../../../server/negarin-api";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string; fileId: string }> }) {
  const { id, fileId } = await params;
  if (!isUuid(id) || !isUuid(fileId) || request.nextUrl.search) return NextResponse.json({ error: "invalid-id" }, { status: 400, headers: { "Cache-Control": "no-store" } });
  return authenticatedProxy(request, `/api/v1/admin/service-assignments/${id}/files/${fileId}`);
}
