import { NextResponse, type NextRequest } from "next/server";
import { authenticatedProxy, rejectCrossOriginMutation } from "../../../../../../server/api-proxy";
import { isUuid } from "../../../../../../server/negarin-api";

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!isUuid(id) || request.nextUrl.search.length) return NextResponse.json({ error: "invalid-id" }, { status: 400, headers: { "Cache-Control": "no-store" } });
  const crossOrigin = rejectCrossOriginMutation(request);
  if (crossOrigin) return crossOrigin;
  return authenticatedProxy(request, `/api/v1/supporting-organization/invitations/${id}/revoke`, { method: "POST", body: "{}" });
}
