import { NextResponse, type NextRequest } from "next/server";
import { NEGARIN_SESSION_COOKIE, negarinFetch, sessionCookieOptions } from "../../../../server/negarin-api";
import { rejectCrossOriginMutation, sessionTokenFromRequest } from "../../../../server/api-proxy";

export async function DELETE(request: NextRequest) {
  const crossOrigin = rejectCrossOriginMutation(request);
  if (crossOrigin) return crossOrigin;
  const token = sessionTokenFromRequest(request);
  if (token) {
    let upstream: Response;
    try {
      upstream = await negarinFetch("/api/v1/identity/session/revoke", token, { method: "POST" }, request.headers.get("x-request-id"));
    } catch {
      return NextResponse.json({ error: { code: "upstream-unavailable", message: "Upstream unavailable" } }, {
        status: 502,
        headers: { "Cache-Control": "no-store" }
      });
    }
    if (!upstream.ok) {
      return NextResponse.json({ error: { code: "logout-failed", message: "Logout failed" } }, {
        status: 502,
        headers: { "Cache-Control": "no-store" }
      });
    }
  }
  const response = new NextResponse(null, { status: 204, headers: { "Cache-Control": "no-store" } });
  response.cookies.set(NEGARIN_SESSION_COOKIE, "", { ...sessionCookieOptions(), maxAge: 0 });
  return response;
}
