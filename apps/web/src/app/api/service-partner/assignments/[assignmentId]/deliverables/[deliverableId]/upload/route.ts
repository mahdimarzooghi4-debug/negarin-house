import { NextResponse } from "next/server";
import { isSameOriginRequest, requestArtistApi } from "../../../../../../../../artist-api";

export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ assignmentId: string; deliverableId: string }> };
const acceptedTypes = new Set(["application/pdf", "image/jpeg", "image/png", "image/webp"]);
const maxBytes = 10 * 1024 * 1024;

async function readLimitedBody(request: Request): Promise<{ kind: "ready"; bytes: ArrayBuffer } | { kind: "empty" } | { kind: "too-large" }> {
  if (!request.body) return { kind: "empty" };
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let length = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > maxBytes) {
        await reader.cancel().catch(() => undefined);
        return { kind: "too-large" };
      }
      chunks.push(value);
    }
  } catch {
    return { kind: "empty" };
  } finally {
    reader.releaseLock();
  }
  if (length === 0) return { kind: "empty" };
  const bytes = new ArrayBuffer(length);
  const view = new Uint8Array(bytes);
  let offset = 0;
  for (const chunk of chunks) {
    view.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return { kind: "ready", bytes };
}

export async function PUT(request: Request, { params }: RouteContext) {
  if (!isSameOriginRequest(request)) return NextResponse.json(null, { status: 403 });
  const contentType = request.headers.get("content-type") ?? "";
  if (!acceptedTypes.has(contentType)) return NextResponse.json(null, { status: 400 });
  const body = await readLimitedBody(request);
  if (body.kind === "too-large") return NextResponse.json(null, { status: 413 });
  if (body.kind === "empty") return NextResponse.json(null, { status: 400 });

  const { assignmentId, deliverableId } = await params;
  const basePath = `service-partner/assignments/${encodeURIComponent(assignmentId)}/deliverables/${encodeURIComponent(deliverableId)}`;
  const refreshed = await requestArtistApi(`${basePath}/upload-url`, { method: "POST" });
  if (refreshed.status < 200 || refreshed.status >= 300) {
    return NextResponse.json(refreshed.data, { status: refreshed.status, headers: { "Cache-Control": "no-store" } });
  }
  const upload = refreshed.data as { uploadUrl?: unknown } | null;
  if (!upload || typeof upload.uploadUrl !== "string") return NextResponse.json(null, { status: 502 });
  let uploadUrl: URL;
  try { uploadUrl = new URL(upload.uploadUrl); } catch { return NextResponse.json(null, { status: 502 }); }
  if (uploadUrl.protocol !== "https:" && uploadUrl.protocol !== "http:") return NextResponse.json(null, { status: 502 });

  let stored: Response;
  try {
    stored = await fetch(uploadUrl, {
      method: "PUT", headers: { "Content-Type": contentType }, body: body.bytes, cache: "no-store"
    });
  } catch {
    return NextResponse.json({ error: "storage-upload-failed" }, { status: 502, headers: { "Cache-Control": "no-store" } });
  }
  if (!stored.ok) return NextResponse.json({ error: "storage-upload-failed" }, { status: 502, headers: { "Cache-Control": "no-store" } });

  const completed = await requestArtistApi(`${basePath}/complete`, { method: "POST" });
  return NextResponse.json(completed.data, { status: completed.status, headers: { "Cache-Control": "no-store" } });
}
