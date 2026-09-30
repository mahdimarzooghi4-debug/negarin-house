import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import type { ObjectStorage } from "@negarin/storage";
import { PrismaService } from "./prisma.service.js";
import { OBJECT_STORAGE } from "./artist-product-media.js";

@Injectable()
export class CustomerCatalogService {
  constructor(
    private readonly database: PrismaService,
    @Inject(OBJECT_STORAGE) private readonly storage: ObjectStorage
  ) {}

  async list() {
    const products = await this.database.artistProduct.findMany({
      where: { publicationStatus: "published", archivedAt: null },
      orderBy: [{ updatedAt: "desc" }, { id: "asc" }],
      select: {
        id: true,
        title: true,
        description: true,
        priceToman: true,
        updatedAt: true,
        media: {
          where: { status: "ready" },
          orderBy: [{ createdAt: "asc" }, { id: "asc" }],
          select: { id: true, contentType: true, objectKey: true }
        }
      }
    });
    return Promise.all(products.map((product) => this.view(product)));
  }

  async get(productId: string) {
    const product = await this.database.artistProduct.findFirst({
      where: { id: productId, publicationStatus: "published", archivedAt: null },
      select: {
        id: true,
        title: true,
        description: true,
        priceToman: true,
        updatedAt: true,
        media: {
          where: { status: "ready" },
          orderBy: [{ createdAt: "asc" }, { id: "asc" }],
          select: { id: true, contentType: true, objectKey: true }
        }
      }
    });
    if (!product) throw new NotFoundException();
    return this.view(product);
  }

  private async view(product: {
    id: string;
    title: string;
    description: string | null;
    priceToman: bigint;
    updatedAt: Date;
    media: Array<{ id: string; contentType: string; objectKey: string }>;
  }) {
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      priceToman: product.priceToman.toString(),
      updatedAt: product.updatedAt.toISOString(),
      media: await Promise.all(product.media.map(async (item) => ({
        id: item.id,
        contentType: item.contentType,
        readUrl: await this.storage.createReadUrl(item.objectKey)
      })))
    };
  }
}
