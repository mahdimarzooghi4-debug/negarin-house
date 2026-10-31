import { NextResponse, type NextRequest } from "next/server";
import { publicProxy } from "../../../../server/api-proxy";

const allowed = new Set(["q", "category", "minPriceToman", "maxPriceToman", "inStock", "page", "pageSize", "sort"]);

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const seen = new Set<string>();
  for (const [key] of params) {
    if (!allowed.has(key) || seen.has(key)) {
      return NextResponse.json({ error: "invalid-query" }, { status: 400, headers: { "Cache-Control": "no-store" } });
    }
    seen.add(key);
  }
  const query = params.size ? `?${params.toString()}` : "";
  return publicProxy(request, `/api/v1/catalog/products${query}`);
}
