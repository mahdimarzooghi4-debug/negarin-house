import { NextResponse } from "next/server";
import { publicCatalogProxy } from "../../../../../../../server/public-catalog-proxy";
import { isUuid } from "../../../../../../../server/negarin-api";

export async function GET(_request: Request, {params}: {params: Promise<{id: string; imageId: string}>}) {
  const {id, imageId} = await params;
  if (!isUuid(id) || !isUuid(imageId)) return NextResponse.json({error: "invalid-id"}, {status: 400});
  return publicCatalogProxy(`/api/v1/catalog/products/${id}/images/${imageId}`);
}
