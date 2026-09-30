import { NextResponse } from "next/server";
import { isSameOriginRequest, readLimitedJsonBody, requestArtistApi } from "../../../../../../artist-api";

export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ assignmentId: string }> };

export async function POST(request: Request, { params }: RouteContext) {
  if (!isSameOriginRequest(request)) return NextResponse.json(null, { status: 403 });
  const parsed = await readLimitedJsonBody(request);
  if (parsed.kind !== "ready") return NextResponse.json(null, { status: parsed.kind === "too-large" ? 413 : 400 });
  const { assignmentId } = await params;
  const result = await requestArtistApi(
    `service-partner/assignments/${encodeURIComponent(assignmentId)}/response`,
    { method: "POST", body: JSON.stringify(parsed.value) }
  );
  return NextResponse.json(result.data, { status: result.status, headers: { "Cache-Control": "no-store" } });
}
