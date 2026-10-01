import { NextResponse } from "next/server";
import { isSameOriginRequest, readLimitedJsonBody, requestArtistApi } from "../../../../../artist-api";

export const dynamic = "force-dynamic";

export async function PATCH(request: Request, context: { params: Promise<{ programId: string }> }) {
  if (!isSameOriginRequest(request)) return NextResponse.json(null, { status: 403 });
  const parsed = await readLimitedJsonBody(request);
  if (parsed.kind !== "ready") return NextResponse.json(null, { status: parsed.kind === "too-large" ? 413 : 400 });
  const { programId } = await context.params;
  const result = await requestArtistApi(`supporting-organization/programs/${encodeURIComponent(programId)}`, {
    method: "PATCH", body: JSON.stringify(parsed.value)
  });
  return NextResponse.json(result.data, { status: result.status, headers: { "Cache-Control": "no-store" } });
}
