import { NextResponse } from "next/server";
import { isSameOriginRequest, requestArtistApi } from "../../../../artist-api";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) return NextResponse.json(null, { status: 403 });
  const declaredLength = request.headers.get("content-length");
  if (declaredLength && (!/^\d+$/.test(declaredLength) || Number(declaredLength) > 4096)) {
    return NextResponse.json(null, { status: 413 });
  }
  if (!request.body) return NextResponse.json(null, { status: 400 });

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 4096) {
        await reader.cancel();
        return NextResponse.json(null, { status: 413 });
      }
      chunks.push(value);
    }
  } catch {
    return NextResponse.json(null, { status: 400 });
  } finally {
    reader.releaseLock();
  }

  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  let body: unknown;
  try { body = JSON.parse(new TextDecoder().decode(bytes)) as unknown; } catch {
    return NextResponse.json(null, { status: 400 });
  }

  const result = await requestArtistApi("admin/service-requests", {
    method: "POST", body: JSON.stringify(body)
  });
  return NextResponse.json(result.data, { status: result.status, headers: { "Cache-Control": "no-store" } });
}
