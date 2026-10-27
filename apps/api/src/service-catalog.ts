import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { canAccessStaffDomain, type AuthorizationContext } from "@negarin/authz";
import { enforceDecision } from "./authorization.guard.js";
import { parseArtistProductId } from "./artist-products.js";
import { parseCartCommand } from "./customer-cart.js";
import type { Prisma } from "./generated/prisma/client.js";
import { PrismaService } from "./prisma.service.js";

function object(body: unknown, keys: string[]) {
  if (!body || typeof body !== "object" || Array.isArray(body) || Object.keys(body).some(k => !keys.includes(k))) throw new BadRequestException();
  return body as Record<string, unknown>;
}
function text(value: unknown, max: number) {
  if (typeof value !== "string" || !value.trim() || value.trim().length > max || /[\u0000-\u001f\u007f-\u009f\u202a-\u202e\u2066-\u2069]/u.test(value)) throw new BadRequestException();
  return value.trim();
}
export function parseServiceCatalogCreate(body: unknown) {
  const b = object(body, ["idempotencyKey", "title", "description"]);
  return { idempotencyKey: parseArtistProductId(b.idempotencyKey as string), title: text(b.title, 200), description: text(b.description, 2000) };
}
export function parseServiceCatalogAvailability(body: unknown) {
  const b = object(body, ["version", "available"]);
  if (typeof b.available !== "boolean") throw new BadRequestException();
  return { ...parseCartCommand({ version: b.version }), available: b.available };
}
const include = { events: { orderBy: { version: "asc" } } } satisfies Prisma.ServiceCatalogItemInclude;
type Item = Prisma.ServiceCatalogItemGetPayload<{ include: typeof include }>;
function view(item: Item, staff = false) {
  return {
    id: item.id, title: item.title, description: item.description,
    ...(staff ? {
      available: item.isActive, version: item.version, createdAt: item.createdAt.toISOString(), updatedAt: item.updatedAt.toISOString(),
      history: item.events.map(e => ({ version: e.version, action: e.action, actorUserId: e.actorUserId, createdAt: e.createdAt.toISOString() }))
    } : {})
  };
}
function sameCommand(a: unknown, b: unknown) {
  if (!a || !b || typeof a !== "object" || typeof b !== "object") return a === b;
  const x = a as Record<string, unknown>, y = b as Record<string, unknown>;
  return Object.keys(x).length === Object.keys(y).length && Object.keys(x).every(k => x[k] === y[k]);
}
@Injectable()
export class ServiceCatalogService {
  constructor(private readonly db: PrismaService) {}

  async list(context: AuthorizationContext, page: number, pageSize: number, staff = false) {
    if (staff) enforceDecision(canAccessStaffDomain(context, "services"));
    else if (context.activeRole !== "artist") throw new ForbiddenException();
    const rows = await this.db.serviceCatalogItem.findMany({
      where: staff ? {} : { isActive: true }, include,
      orderBy: [{ createdAt: "asc" }, { id: "asc" }], skip: (page - 1) * pageSize, take: pageSize + 1
    });
    return { page, pageSize, hasMore: rows.length > pageSize, items: rows.slice(0, pageSize).map(i => view(i, staff)) };
  }

  async get(context: AuthorizationContext, id: string, staff = false) {
    if (staff) enforceDecision(canAccessStaffDomain(context, "services"));
    else if (context.activeRole !== "artist") throw new ForbiddenException();
    const item = await this.db.serviceCatalogItem.findFirst({ where: { id, ...(staff ? {} : { isActive: true }) }, include });
    if (!item) throw new NotFoundException();
    return view(item, staff);
  }

  async create(context: AuthorizationContext, input: ReturnType<typeof parseServiceCatalogCreate>, trace: string) {
    enforceDecision(canAccessStaffDomain(context, "services"));
    const command = parseServiceCatalogCreate(input);
    return this.db.$transaction(async tx => {
      await tx.$queryRawUnsafe('SELECT 1 AS locked FROM pg_advisory_xact_lock(hashtextextended($1, 0))', "service-catalog-create:" + context.userId + ":" + command.idempotencyKey);
      const prior = await tx.serviceCatalogItem.findUnique({ where: { createdByUserId_idempotencyKey: { createdByUserId: context.userId, idempotencyKey: command.idempotencyKey } }, include });
      if (prior) {
        if (!sameCommand(prior.events[0]?.command, command)) throw new ConflictException("idempotency-key-reused");
        return view(prior, true);
      }
      const item = await tx.serviceCatalogItem.create({ data: { ...command, createdByUserId: context.userId } });
      await tx.serviceCatalogEvent.create({ data: { itemId: item.id, version: 0, action: "created", actorUserId: context.userId, command, requestTraceId: trace } });
      return view(await tx.serviceCatalogItem.findUniqueOrThrow({ where: { id: item.id }, include }), true);
    });
  }

  async availability(context: AuthorizationContext, id: string, input: ReturnType<typeof parseServiceCatalogAvailability>, trace: string) {
    enforceDecision(canAccessStaffDomain(context, "services"));
    const command = parseServiceCatalogAvailability(input);
    return this.db.$transaction(async tx => {
      const rows = await tx.$queryRawUnsafe<Array<{ id: string }>>('SELECT "id" FROM "service_catalog_items" WHERE "id" = $1::uuid FOR UPDATE', id);
      if (!rows.length) throw new NotFoundException();
      const item = await tx.serviceCatalogItem.findUniqueOrThrow({ where: { id }, include });
      const last = item.events.at(-1);
      if (item.version === command.version + 1 && last?.actorUserId === context.userId && last.action === "availability_changed" && sameCommand(last.command, command)) return view(item, true);
      if (item.version !== command.version) throw new ConflictException("service-catalog-changed");
      if (item.isActive === command.available) throw new ConflictException("service-catalog-state-unchanged");
      await tx.serviceCatalogItem.update({ where: { id }, data: { isActive: command.available, version: { increment: 1 } } });
      await tx.serviceCatalogEvent.create({ data: { itemId: id, version: item.version + 1, action: "availability_changed", actorUserId: context.userId, command, requestTraceId: trace } });
      return view(await tx.serviceCatalogItem.findUniqueOrThrow({ where: { id }, include }), true);
    });
  }
}
