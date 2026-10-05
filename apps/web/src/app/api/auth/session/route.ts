import { NextResponse, type NextRequest } from "next/server";
import { NEGARIN_SESSION_COOKIE, negarinFetch, sessionCookieOptions } from "../../../../server/negarin-api";
import { sessionTokenFromRequest } from "../../../../server/api-proxy";

export async function DELETE(request: NextRequest) {
  const token = sessionTokenFromRequest(request);
  if (token) {
    try {
      await negarinFetch("/api/v1/identity/session/revoke", token, { method: "POST" }, request.headers.get("x-request-id"));
    } catch {
      // Cookie removal is still required if the API is temporarily unavailable.
    }
  }
  const response = new NextResponse(null, { status: 204, headers: { "Cache-Control": "no-store" } });
  response.cookies.set(NEGARIN_SESSION_COOKIE, "", { ...sessionCookieOptions(), maxAge: 0 });
  return response;
}
