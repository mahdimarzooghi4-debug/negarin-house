import { z } from "zod";

export const apiErrorSchema = z.object({
  error: z.object({
    code: z.string().min(1),
    message: z.string().min(1),
    requestId: z.string().min(1)
  })
});

export type ApiError = z.infer<typeof apiErrorSchema>;

export const cursorPageSchema = <T extends z.ZodType>(item: T) =>
  z.object({
    items: z.array(item),
    nextCursor: z.string().nullable()
  });

export const businessIdSchema = z.string().regex(/^[A-Z][A-Z0-9]*-[A-Z0-9-]+$/);


/** Locked Phase 1 Growth taxonomy. Order is part of the product contract. */
export const growthLevels = [
  "جوانه",
  "شکوفه",
  "سرو زرین",
  "سفیر جهانی"
] as const;

export type GrowthLevel = (typeof growthLevels)[number];

export const growthLevelSchema = z.enum(growthLevels);

export const growthRegistrySchema = z.object({
  purchasable: z.literal(false),
  levels: z.array(z.object({
    order: z.number().int().positive(),
    name: growthLevelSchema
  })).length(growthLevels.length)
});
