import { NextResponse } from "next/server";
import { requestArtistApi } from "../../../../artist-api";

export const dynamic = "force-dynamic";

export async function GET() {
  const result = await requestArtistApi("staff/publication-reviews");
  return NextResponse.json(result.data, { status: result.status, headers: { "Cache-Control": "no-store" } });
}
