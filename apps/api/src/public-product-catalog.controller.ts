import { BadRequestException, Controller, Get, Header, Param, Query } from "@nestjs/common";
import { parseArtistProductId } from "./artist-products.js";
import { parseCatalogQuery, PublicProductCatalogService } from "./public-product-catalog.js";

@Controller("catalog")
export class PublicProductCategoriesController {
  constructor(private readonly catalog: PublicProductCatalogService) {}
  @Get("categories")
  @Header("Cache-Control", "no-store")
  categories() { return this.catalog.categories(); }
}

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

@Controller("catalog/storefronts")
export class PublicArtistStorefrontController {
  constructor(private readonly catalog: PublicProductCatalogService) {}
  @Get(":id")
  @Header("Cache-Control", "no-store")
  storefront(@Param("id") id: string, @Query() query: Record<string, unknown>) {
    const storefrontId = parseArtistProductId(id);
    const allowed = ["page", "pageSize"];
    if (Object.keys(query).some(key => !allowed.includes(key))) throw new BadRequestException();
    const parse = (value: unknown, fallback: number, max: number) => {
      if (value === undefined) return fallback;
      if (typeof value !== "string" || !/^[1-9][0-9]{0,3}$/.test(value) || Number(value) > max) throw new BadRequestException();
      return Number(value);
    };
    return this.catalog.storefront(storefrontId, parse(query.page, 1, 1000), parse(query.pageSize, 20, 50));
  }
  @Get(":id/images/:imageId")
  @Header("Cache-Control", "no-store")
  image(@Param("id") id: string, @Param("imageId") imageId: string) {
    return this.catalog.storefrontImage(parseArtistProductId(id), parseArtistProductId(imageId));
  }
}
