import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { isSameOriginRequest, requestArtistApi } from "../../../../artist-api";

const sessionCookieName = "negarin_session";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) return NextResponse.json(null, { status: 403 });

  const result = await requestArtistApi("identity/logout", { method: "POST" });
  if (result.status === 204 || result.status === 401) {
    const cookieStore = await cookies();
    cookieStore.delete(sessionCookieName);
    return new NextResponse(null, { status: 204, headers: { "Cache-Control": "no-store" } });
  }

  return NextResponse.json(null, {
    status: result.status,
    headers: { "Cache-Control": "no-store" }
  });
}
