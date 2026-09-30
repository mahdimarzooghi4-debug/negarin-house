import { NextResponse } from "next/server";
import { isSameOriginRequest, readLimitedJsonBody, requestArtistApi } from "../../../../../../artist-api";

export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ deliverableId: string }> };

export async function POST(request: Request, { params }: RouteContext) {
  if (!isSameOriginRequest(request)) return NextResponse.json(null, { status: 403 });
  const parsed = await readLimitedJsonBody(request);
  if (parsed.kind !== "ready") return NextResponse.json(null, { status: parsed.kind === "too-large" ? 413 : 400 });
  const { deliverableId } = await params;
  const result = await requestArtistApi(`admin/service-deliverables/${encodeURIComponent(deliverableId)}/review`, {
    method: "POST", body: JSON.stringify(parsed.value)
  });
  return NextResponse.json(result.data, { status: result.status, headers: { "Cache-Control": "no-store" } });
}
