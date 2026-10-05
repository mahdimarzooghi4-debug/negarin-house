import { ForbiddenException } from "@nestjs/common";
import { growthLevels, growthRegistrySchema } from "@negarin/contracts";
import { canAccessStaffDomain, type AuthorizationContext } from "@negarin/authz";
import { enforceDecision } from "./authorization.guard.js";

export function growthRegistryView() {
  return growthRegistrySchema.parse({
    purchasable: false,
    levels: growthLevels.map((name, index) => ({ order: index + 1, name }))
  });
}

export function assertArtistGrowthRead(context: AuthorizationContext): void {
  if (context.activeRole !== "artist") throw new ForbiddenException();
}

export function assertStaffGrowthRead(context: AuthorizationContext): void {
  enforceDecision(canAccessStaffDomain(context, "growth"));
}
