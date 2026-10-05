import type { NextRequest } from "next/server";
import { authenticatedProxy } from "../../../../server/api-proxy";

export async function GET(request: NextRequest) {
  return authenticatedProxy(request, "/api/v1/corporate/products" + request.nextUrl.search);
}
