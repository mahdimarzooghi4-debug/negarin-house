import { NextResponse } from "next/server";
import { isSameOriginRequest, readLimitedJsonBody, requestArtistApi } from "../../../../artist-api";

export const dynamic = "force-dynamic";

export async function GET() {
  const result = await requestArtistApi("corporate-buyer/purchase-requests");
  return NextResponse.json(result.data, { status: result.status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) return NextResponse.json(null, { status: 403 });
  const parsed = await readLimitedJsonBody(request);
  if (parsed.kind !== "ready") return NextResponse.json(null, { status: parsed.kind === "too-large" ? 413 : 400 });
  const result = await requestArtistApi("corporate-buyer/purchase-requests", { method: "POST", body: JSON.stringify(parsed.value) });
  return NextResponse.json(result.data, { status: result.status, headers: { "Cache-Control": "no-store" } });
}
