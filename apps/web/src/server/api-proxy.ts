import { NextResponse, type NextRequest } from "next/server";
import {
  NEGARIN_SESSION_COOKIE,
  isSessionToken,
  negarinFetch,
  sessionCookieOptions
} from "./negarin-api";

export function sessionTokenFromRequest(request: NextRequest): string | null {
  const value = request.cookies.get(NEGARIN_SESSION_COOKIE)?.value;
  return isSessionToken(value) ? value : null;
}

export function unauthorized(clearCookie = false): NextResponse {
  const response = NextResponse.json({ error: { code: "unauthorized", message: "Unauthorized" } }, {
    status: 401,
    headers: { "Cache-Control": "no-store" }
  });
  if (clearCookie) response.cookies.set(NEGARIN_SESSION_COOKIE, "", { ...sessionCookieOptions(), maxAge: 0 });
  return response;
}

export async function proxyResponse(upstream: Response, clearCookieOnUnauthorized = true): Promise<NextResponse> {
  const body = await upstream.text();
  const headers = new Headers({ "Cache-Control": "no-store" });
  const contentType = upstream.headers.get("content-type");
  if (contentType) headers.set("content-type", contentType);
  const requestId = upstream.headers.get("x-request-id");
  if (requestId) headers.set("x-request-id", requestId);
  const response = new NextResponse(body || null, { status: upstream.status, headers });
  if (clearCookieOnUnauthorized && upstream.status === 401) {
    response.cookies.set(NEGARIN_SESSION_COOKIE, "", { ...sessionCookieOptions(), maxAge: 0 });
  }
  return response;
}

export async function authenticatedProxy(
  request: NextRequest,
  path: string,
  init: RequestInit = {}
): Promise<NextResponse> {
  const token = sessionTokenFromRequest(request);
  if (!token) return unauthorized();
  const upstream = await negarinFetch(path, token, init, request.headers.get("x-request-id"));
  return proxyResponse(upstream);
}

export async function jsonBody(request: NextRequest, maxBytes = 64 * 1024): Promise<string | null> {
  const body = await request.text();
  if (Buffer.byteLength(body, "utf8") > maxBytes) return null;
  try {
    JSON.parse(body);
    return body;
  } catch {
    return null;
  }
}
