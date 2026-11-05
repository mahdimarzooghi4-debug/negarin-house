import { NextResponse } from "next/server";
import { apiUrl } from "./negarin-api";
import { proxyResponse } from "./api-proxy";

export async function publicCatalogProxy(path: string): Promise<NextResponse> {
  try {
    const response = await fetch(apiUrl(path), {
      headers: {accept: "application/json"},
      cache: "no-store",
      redirect: "manual"
    });
    if (response.status >= 300 && response.status < 400) {
      return NextResponse.json({error: "catalog-unavailable"}, {
        status: 502, headers: {"Cache-Control": "no-store"}
      });
    }
    return proxyResponse(response, false);
  } catch {
    return NextResponse.json({error: "catalog-unavailable"}, {
      status: 502, headers: {"Cache-Control": "no-store"}
    });
  }
}
