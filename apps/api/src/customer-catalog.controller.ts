import { Controller, Get, Header, Param } from "@nestjs/common";
import { parseArtistProductId } from "./artist-products.js";
import { CustomerCatalogService } from "./customer-catalog.js";

/** Public, read-only projection. Only products explicitly published by staff enter it. */
@Controller("customer/catalog")
export class CustomerCatalogController {
  constructor(private readonly catalog: CustomerCatalogService) {}

  @Get()
  @Header("Cache-Control", "no-store")
  list() {
    return this.catalog.list();
  }

  @Get(":productId")
  @Header("Cache-Control", "no-store")
  get(@Param("productId") productId: string) {
    return this.catalog.get(parseArtistProductId(productId));
  }
}
