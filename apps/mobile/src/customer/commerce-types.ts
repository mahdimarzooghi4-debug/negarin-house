export function isUuid(value: unknown): value is string { return typeof value === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value); }
export type AddressFields = { recipientName: string; recipientPhone: string; province: string; city: string; postalCode: string; fullAddress: string };
export type OrderReceipt={id:string;status:"reserved"|"cancelled"|"expired"|"placed";paymentStatus:"unpaid"|"paid"|"reconciliation_required";subtotalToman:string;reservedUntil:string};

export function parseOrderReceipt(value:unknown,expectedSubtotal:string):OrderReceipt|null {
  if(!value||typeof value!=="object"||Array.isArray(value))return null;
  const order=value as Record<string,unknown>;
  if(!isUuid(order.id)||!["reserved","cancelled","expired","placed"].includes(String(order.status))||!["unpaid","paid","reconciliation_required"].includes(String(order.paymentStatus))||order.subtotalToman!==expectedSubtotal||typeof order.reservedUntil!=="string")return null;
  const date=new Date(order.reservedUntil);
  if(!Number.isFinite(date.getTime())||date.toISOString()!==order.reservedUntil)return null;
  return {id:order.id,status:order.status as OrderReceipt["status"],paymentStatus:order.paymentStatus as OrderReceipt["paymentStatus"],subtotalToman:expectedSubtotal,reservedUntil:order.reservedUntil};
}

