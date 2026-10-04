import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import type { AuthorizationContext } from "@negarin/authz";
import type { Prisma } from "./generated/prisma/client.js";
import { PrismaService } from "./prisma.service.js";

export const maxCustomerAddresses = 20;
const limits = { recipientName: 200, province: 100, city: 100, fullAddress: 2000 };
export type AddressFields = { recipientName: string; recipientPhone: string; province: string; city: string; postalCode: string; fullAddress: string };
export type AddressCommand = { version: number; address?: AddressFields; makeDefault?: boolean };
function digits(text: string) {
  return text.replace(/[۰-۹٠-٩]/g, (d) => String(d.charCodeAt(0) - (d >= "۰" ? 1776 : 1632)));
}
export function parseAddressCommand(body: unknown, fields = false): AddressCommand {
  if (!body || typeof body !== "object" || Array.isArray(body)) throw new BadRequestException();
  const v = body as Record<string, unknown>;
  const allowed = fields ? ["version", "makeDefault", "recipientPhone", "postalCode", ...Object.keys(limits)] : ["version"];
  if (Object.keys(v).some((key) => !allowed.includes(key)) || !Number.isInteger(v.version) ||
      (v.version as number) < 0 || (v.version as number) >= 2147483647) throw new BadRequestException();
  if (!fields) return { version: v.version as number };
  if (v.makeDefault !== undefined && typeof v.makeDefault !== "boolean") throw new BadRequestException();
  const values: Record<string, string> = {};
  for (const [key, limit] of Object.entries(limits)) {
    const value = v[key];
    if (typeof value !== "string" || !value.trim() || value.trim().length > limit || /[\u0000-\u001f\u007f]/.test(value)) throw new BadRequestException(`invalid-${key}`);
    values[key] = value.trim();
  }
  if (typeof v.recipientPhone !== "string" || v.recipientPhone.length > 32 || typeof v.postalCode !== "string" || v.postalCode.length > 32) throw new BadRequestException();
  let phone = digits(v.recipientPhone.trim());
  if (/^09[0-9]{9}$/.test(phone)) phone = "+98" + phone.slice(1);
  const postalCode = digits(v.postalCode.trim());
  if (!/^\+989[0-9]{9}$/.test(phone) || !/^[0-9]{10}$/.test(postalCode)) throw new BadRequestException("invalid-address-contact");
  return { version: v.version as number, makeDefault: v.makeDefault === true,
    address: { ...values, recipientPhone: phone, postalCode } as AddressFields };
}
const addressSelect = { id: true, recipientName: true, recipientPhone: true, province: true, city: true,
  postalCode: true, fullAddress: true, isDefault: true } satisfies Prisma.CustomerAddressSelect;
@Injectable()
export class CustomerAddressesService {
  constructor(private readonly db: PrismaService) {}
  private customer(context: AuthorizationContext) {
    if (context.activeRole !== "customer") throw new ForbiddenException();
  }
  private async snapshot(tx: Prisma.TransactionClient, userId: string) {
    const book = await tx.customerAddressBook.findUniqueOrThrow({ where: { userId }, select: { version: true,
      addresses: { orderBy: [{ createdAt: "asc" }, { id: "asc" }], select: addressSelect } } });
    return { version: book.version, addresses: book.addresses };
  }
  async get(context: AuthorizationContext) {
    this.customer(context);
    await this.db.customerAddressBook.createMany({ data: [{ userId: context.userId }], skipDuplicates: true });
    return this.db.$transaction((tx) => this.snapshot(tx, context.userId), { isolationLevel: "RepeatableRead" });
  }
  async change(context: AuthorizationContext, command: AddressCommand, action: "create" | "replace" | "delete" | "default", id?: string) {
    this.customer(context);
    return this.db.$transaction(async (tx) => {
      await tx.customerAddressBook.createMany({ data: [{ userId: context.userId }], skipDuplicates: true });
      const book = await tx.customerAddressBook.findUniqueOrThrow({ where: { userId: context.userId }, select: { id: true } });
      const locked = await tx.customerAddressBook.updateMany({ where: { id: book.id, version: command.version }, data: { version: { increment: 1 } } });
      if (locked.count !== 1) throw new ConflictException("address-book-state-changed");
      const existing = action === "create" ? null : await tx.customerAddress.findFirst({ where: { id, bookId: book.id } });
      if (action !== "create" && !existing) throw new NotFoundException();
      let changed = true;
      if (action === "create") {
        const count = await tx.customerAddress.count({ where: { bookId: book.id } });
        if (count >= maxCustomerAddresses) throw new ConflictException("address-book-limit");
        const isDefault = count === 0 || command.makeDefault === true;
        if (isDefault) await tx.customerAddress.updateMany({ where: { bookId: book.id, isDefault: true }, data: { isDefault: false } });
        await tx.customerAddress.create({ data: { bookId: book.id, ...command.address!, isDefault } });
      } else if (action === "delete") {
        await tx.customerAddress.delete({ where: { id: existing!.id } });
        if (existing!.isDefault) {
          const next = await tx.customerAddress.findFirst({ where: { bookId: book.id }, orderBy: [{ createdAt: "asc" }, { id: "asc" }] });
          if (next) await tx.customerAddress.update({ where: { id: next.id }, data: { isDefault: true } });
        }
      } else {
        const promote = command.makeDefault === true || action === "default";
        changed = (promote && !existing!.isDefault) || (action === "replace" && Object.entries(command.address!).some(([key, value]) => existing![key as keyof AddressFields] !== value));
        if (changed) {
          if (promote && !existing!.isDefault) await tx.customerAddress.updateMany({ where: { bookId: book.id, isDefault: true }, data: { isDefault: false } });
          await tx.customerAddress.update({ where: { id: existing!.id }, data: { ...(action === "replace" ? command.address : {}), ...(promote ? { isDefault: true } : {}) } });
        }
      }
      if (!changed) await tx.customerAddressBook.update({ where: { id: book.id }, data: { version: command.version } });
      return this.snapshot(tx, context.userId);
    });
  }
}
