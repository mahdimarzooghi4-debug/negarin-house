import { BadRequestException } from "@nestjs/common";

// Text values match the Artist editor; weight/dimensions are not shipping measurements.
export const specificationLimits = {
  category: 200, dimensions: 500, materials: 500, weight: 200,
  color: 200, technique: 500, careInstructions: 2000
} as const;
export type ProductSpecifications = { -readonly [K in keyof typeof specificationLimits]: string | null };
export const specificationFields = Object.keys(specificationLimits) as (keyof ProductSpecifications)[];

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

export function productContentSnapshot(product: ProductSpecifications & { title: string; description: string | null }) {
  return {
    title: product.title, description: product.description,
    category: product.category, dimensions: product.dimensions, materials: product.materials,
    weight: product.weight, color: product.color, technique: product.technique,
    careInstructions: product.careInstructions
  };
}
