import { NextResponse } from "next/server";
import { isSameOriginRequest, readLimitedJsonBody, requestArtistApi } from "../../../../../../artist-api";

export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ assignmentId: string }> };

export async function GET(_request: Request, { params }: RouteContext) {
  const { assignmentId } = await params;
  const result = await requestArtistApi(
    `service-partner/assignments/${encodeURIComponent(assignmentId)}/deliverables`
  );
  return NextResponse.json(result.data, { status: result.status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request, { params }: RouteContext) {
  if (!isSameOriginRequest(request)) return NextResponse.json(null, { status: 403 });
  const parsed = await readLimitedJsonBody(request);
  if (parsed.kind !== "ready") return NextResponse.json(null, { status: parsed.kind === "too-large" ? 413 : 400 });
  const { assignmentId } = await params;
  const result = await requestArtistApi(
    `service-partner/assignments/${encodeURIComponent(assignmentId)}/deliverables/upload-url`,
    { method: "POST", body: JSON.stringify(parsed.value) }
  );
  if (result.status < 200 || result.status >= 300) {
    return NextResponse.json(result.data, { status: result.status, headers: { "Cache-Control": "no-store" } });
  }
  const deliverable = result.data as { id?: unknown } | null;
  if (!deliverable || typeof deliverable.id !== "string") return NextResponse.json(null, { status: 502 });
  return NextResponse.json({ id: deliverable.id }, { status: 201, headers: { "Cache-Control": "no-store" } });
}
