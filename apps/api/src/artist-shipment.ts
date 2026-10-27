import { BadRequestException } from "@nestjs/common";
import type { ArtistShipmentReport } from "./generated/prisma/client.js";
export type ShipmentCommand = { version: number; carrierName: string; trackingCode: string };
export function parseShipment(body: unknown): ShipmentCommand {
  if (!body || typeof body !== "object" || Array.isArray(body)) throw new BadRequestException();
  const v = body as Record<string, unknown>;
  if (Object.keys(v).some(k => !["version", "carrierName", "trackingCode"].includes(k)) ||
    !Number.isInteger(v.version) || (v.version as number) < 0 || (v.version as number) >= 2147483647 ||
    typeof v.carrierName !== "string" || typeof v.trackingCode !== "string") throw new BadRequestException();
  // Reject controls before trimming. Normalize local digit input while preserving leading zeroes.
  if (/[\u0000-\u001f\u007f-\u009f\u202a-\u202e\u2066-\u2069]/u.test(v.carrierName + v.trackingCode)) throw new BadRequestException();
  const carrierName = v.carrierName.trim();
  const trackingCode = v.trackingCode.trim().replace(/[۰-۹]/g, d => String(d.charCodeAt(0) - 1776)).replace(/[٠-٩]/g, d => String(d.charCodeAt(0) - 1632));
  if (!carrierName || carrierName.length > 100 || trackingCode.length > 100 || !/^[A-Za-z0-9-]+$/.test(trackingCode)) throw new BadRequestException();
  return { version: v.version as number, carrierName, trackingCode };
}
export function shipmentView(s: ArtistShipmentReport | null) {
  if (!s) return null;
  return { status: "reported_dispatched" as const, source: "artist_report" as const, carrierVerified: false,
    carrierName: s.carrierName, trackingCode: s.trackingCode, reportedAt: s.reportedAt.toISOString() };
}
