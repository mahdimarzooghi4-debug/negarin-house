import type {NextRequest} from "next/server";
import {publicCatalogProxy} from "../../../../server/public-catalog-proxy";
export async function GET(request:NextRequest){return publicCatalogProxy("/api/v1/catalog/artists"+request.nextUrl.search);}
