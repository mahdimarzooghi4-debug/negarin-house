import { ForbiddenException, Injectable, NotFoundException, ServiceUnavailableException } from "@nestjs/common";
import type { AuthorizationContext } from "@negarin/authz";
import { PrismaService } from "./prisma.service.js";
import { ProductImageStorage } from "./product-images.js";

@Injectable()
export class CustomerOrderImagesService {
  constructor(private readonly db: PrismaService, private readonly storage: ProductImageStorage) {}

  async read(context: AuthorizationContext, orderId: string, productId: string, imageId: string) {
    if (context.activeRole !== "customer") throw new ForbiddenException();
    const item = await this.db.customerOrderItem.findFirst({
      where: { orderId, productId, imageIds: { has: imageId }, order: { userId: context.userId } },
      select: { productId: true }
    });
    if (!item) throw new NotFoundException();
    const image = await this.db.productImage.findFirst({ where: { id: imageId, productId },
      select: { id: true, objectKey: true, width: true, height: true, byteLength: true } });
    if (!image) throw new NotFoundException();
    try {
      return { id: image.id, width: image.width, height: image.height, byteLength: image.byteLength,
        contentType: "image/webp", url: await this.storage.store.createReadUrl(image.objectKey), expiresInSeconds: 300 };
    } catch { throw new ServiceUnavailableException("image-storage-unavailable"); }
  }
}
