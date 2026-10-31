import { BadRequestException } from "@nestjs/common";

// Text values match the Artist editor; weight/dimensions are not shipping measurements.
export const specificationLimits = {
  category: 200, preparationTime: 200, dimensions: 500, materials: 500, weight: 200,
  color: 200, technique: 500, careInstructions: 2000
} as const;
export type ProductSpecifications = { -readonly [K in keyof typeof specificationLimits]: string | null };
export const specificationFields = Object.keys(specificationLimits) as (keyof ProductSpecifications)[];
export type ProductContent = ProductSpecifications & { title: string; description: string | null; imageIds: string[] };

export function parseProductSpecifications(input: Record<string, unknown>): Partial<ProductSpecifications> {
  const result: Partial<ProductSpecifications> = {};
  for (const key of specificationFields) {
    if (!Object.hasOwn(input, key)) continue;
    const value = input[key];
    if (value !== null && (typeof value !== "string" || value.length > specificationLimits[key] || !value.trim())) {
      throw new BadRequestException(`invalid-product-${key}`);
    }
    result[key] = typeof value === "string" ? value.trim() : null;
  }
  return result;
}

export function productContentSnapshot(product: ProductSpecifications & { title: string; description: string | null; imageIds: string[] }) {
  return {
    title: product.title, description: product.description,
    category: product.category, preparationTime: product.preparationTime, dimensions: product.dimensions, materials: product.materials,
    weight: product.weight, color: product.color, technique: product.technique,
    careInstructions: product.careInstructions, imageIds: product.imageIds
  };
}

export function parseProductContent(value: unknown): ProductContent {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new BadRequestException("invalid-product-content");
  const input = value as Record<string, unknown>;
  const allowed = new Set(["title", "description", "imageIds", ...specificationFields]);
  if (Object.keys(input).some(key => !allowed.has(key)) || typeof input.title !== "string" || !input.title.trim() || input.title.length > 200 ||
    (input.description !== null && (typeof input.description !== "string" || input.description.length > 20_000)) ||
    !Array.isArray(input.imageIds) || input.imageIds.length > 8 || input.imageIds.some(id => typeof id !== "string" ||
      !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) ||
    new Set((input.imageIds as string[]).map(id => id.toLowerCase())).size !== input.imageIds.length) {
    throw new BadRequestException("invalid-product-content");
  }
  const specifications = parseProductSpecifications(input);
  return {
    title: input.title.trim(), description: typeof input.description === "string" ? input.description.trim() || null : null,
    ...Object.fromEntries(specificationFields.map(key => [key, specifications[key] ?? null])) as ProductSpecifications,
    imageIds: (input.imageIds as string[]).map(id => id.toLowerCase())
  };
}
