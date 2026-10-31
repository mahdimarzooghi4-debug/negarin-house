import { NextResponse, type NextRequest } from "next/server";
import { authenticatedProxy, jsonBody, rejectCrossOriginMutation } from "../../../../../../server/api-proxy";
import { isUuid } from "../../../../../../server/negarin-api";

const actions = new Set(["reserve", "consume", "release", "reverse"]);

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string; action: string }> }) {
  const { id, action } = await params;
  if (!isUuid(id) || !actions.has(action) || request.nextUrl.search) return NextResponse.json({ error: "invalid-route" }, { status: 400, headers: { "Cache-Control": "no-store" } });
  const crossOrigin = rejectCrossOriginMutation(request);
  if (crossOrigin) return crossOrigin;
  const body = await jsonBody(request, 8 * 1024);
  if (!body) return NextResponse.json({ error: "invalid-body" }, { status: 400, headers: { "Cache-Control": "no-store" } });
  return authenticatedProxy(request, `/api/v1/admin/support-allocations/${id}/${action}`, { method: "POST", body });
}
