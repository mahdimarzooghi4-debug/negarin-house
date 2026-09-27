export type EntityId = string & { readonly __brand: "EntityId" };

export type Money = Readonly<{
  amount: bigint;
  currency: string;
}>;

export function entityId(value: string): EntityId {
  if (value.length === 0) throw new Error("Entity ID cannot be empty");
  return value as EntityId;
}
