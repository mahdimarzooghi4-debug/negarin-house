import { Controller, Get, Header, Param, Req, UseGuards } from "@nestjs/common";
import { AuthorizationGuard, type AuthorizedRequest } from "./authorization.guard.js";
import { parseArtistProductId } from "./artist-products.js";
import { CustomerOrderImagesService } from "./customer-order-images.js";

@Controller("customer/orders/:orderId/items/:productId/images")
@UseGuards(AuthorizationGuard)
export class CustomerOrderImagesController {
  constructor(private readonly images: CustomerOrderImagesService) {}
  @Get(":imageId")
  @Header("Cache-Control", "no-store")
  read(@Req() req: AuthorizedRequest, @Param("orderId") orderId: string, @Param("productId") productId: string, @Param("imageId") imageId: string) {
    return this.images.read(req.authorizationContext!, parseArtistProductId(orderId), parseArtistProductId(productId), parseArtistProductId(imageId));
  }
}
