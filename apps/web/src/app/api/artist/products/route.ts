import { NextResponse } from "next/server";
import { isSameOriginRequest, requestArtistApi } from "../../../../artist-api";

export const dynamic = "force-dynamic";

export async function GET() {
  const result = await requestArtistApi("artist/products?includeArchived=true");
  return NextResponse.json(result.data, { status: result.status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) return NextResponse.json(null, { status: 403 });
  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json(null, { status: 400 }); }
  const result = await requestArtistApi("artist/products", { method: "POST", body: JSON.stringify(body) });
  return NextResponse.json(result.data, { status: result.status, headers: { "Cache-Control": "no-store" } });
}
