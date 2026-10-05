import { NextResponse, type NextRequest } from "next/server";
import {
  NEGARIN_SESSION_COOKIE,
  devSessionAttachEnabled,
  isSessionToken,
  negarinFetch,
  sessionCookieOptions
} from "../../../../server/negarin-api";
import { rejectCrossOriginMutation } from "../../../../server/api-proxy";

export async function POST(request: NextRequest) {
  const crossOrigin = rejectCrossOriginMutation(request);
  if (crossOrigin) return crossOrigin;
  if (!devSessionAttachEnabled()) return new NextResponse(null, { status: 404 });
  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "invalid-body" }, { status: 400 }); }
  if (!body || typeof body !== "object" || Array.isArray(body) ||
      Object.keys(body).some((key) => key !== "sessionToken") ||
      !("sessionToken" in body) || !isSessionToken(body.sessionToken)) {
    return NextResponse.json({ error: "invalid-body" }, { status: 400 });
  }

  const upstream = await negarinFetch("/api/v1/identity/grants", body.sessionToken, {}, request.headers.get("x-request-id"));
  if (!upstream.ok) return NextResponse.json({ error: "invalid-session" }, {
    status: upstream.status === 401 ? 401 : 502,
    headers: { "Cache-Control": "no-store" }
  });

  const response = NextResponse.json({ authenticated: true }, { headers: { "Cache-Control": "no-store" } });
  response.cookies.set(NEGARIN_SESSION_COOKIE, body.sessionToken, sessionCookieOptions());
  return response;
}
