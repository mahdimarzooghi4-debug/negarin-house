import { Controller, Get, Header, Param, Query } from "@nestjs/common";
import { parseArtistProductId } from "./artist-products.js";
import { parseCatalogQuery, PublicProductCatalogService } from "./public-product-catalog.js";

// Read-only discovery deliberately does not require a session or role selection.
@Controller("catalog/products")
export class PublicProductCatalogController {
  constructor(private readonly catalog: PublicProductCatalogService) {}
  @Get()
  @Header("Cache-Control", "no-store")
  list(@Query() query: Record<string, unknown>) { return this.catalog.list(parseCatalogQuery(query)); }
  @Get(":id")
  @Header("Cache-Control", "no-store")
  get(@Param("id") id: string) { return this.catalog.get(parseArtistProductId(id)); }
  @Get(":id/images/:imageId")
  @Header("Cache-Control", "no-store")
  image(@Param("id") id: string, @Param("imageId") imageId: string) {
    return this.catalog.image(parseArtistProductId(id), parseArtistProductId(imageId));
  }
}
