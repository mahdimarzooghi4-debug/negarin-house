import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import type { AuthorizationContext } from "@negarin/authz";
import { parseCartCommand } from "./customer-cart.js";
import { shipmentView } from "./artist-shipment.js";
import { PrismaService } from "./prisma.service.js";
export const issueKinds = ["not_received", "damaged", "wrong_items", "missing_items"] as const;
export type ShipmentIssueCommand = { version: number; kind: typeof issueKinds[number]; description: string };
export function parseShipmentIssue(body: unknown): ShipmentIssueCommand {
  if (!body || typeof body !== "object" || Array.isArray(body)) throw new BadRequestException();
  const v = body as Record<string, unknown>;
  if (Object.keys(v).some(k => !["version", "kind", "description"].includes(k)) ||
    !issueKinds.includes(v.kind as ShipmentIssueCommand["kind"]) || typeof v.description !== "string" ||
    /[\u0000-\u001f\u007f-\u009f\u202a-\u202e\u2066-\u2069]/u.test(v.description)) throw new BadRequestException();
  const { version } = parseCartCommand({ version: v.version });
  const description = v.description.trim();
  if (!description || description.length > 2000) throw new BadRequestException();
  return { version, kind: v.kind as ShipmentIssueCommand["kind"], description };
}
const include = { receipt: true, issue: true, preparation: { include: { order: true } } } as const;
@Injectable()
export class CustomerShipmentsService {
  constructor(private readonly db: PrismaService) {}
  private customer(context: AuthorizationContext) { if (context.activeRole !== "customer") throw new ForbiddenException(); }
  async get(context: AuthorizationContext, orderId: string, shipmentId: string) {
    this.customer(context);
    const s = await this.db.artistShipmentReport.findFirst({ where: { id: shipmentId, orderId,
      preparation: { order: { userId: context.userId, status: "placed", paymentStatus: "paid" } } }, include });
    if (!s) throw new NotFoundException();
    return shipmentView(s);
  }
  async confirm(context: AuthorizationContext, orderId: string, shipmentId: string, version: number, requestId: string) {
    return this.mutate(context, orderId, shipmentId, parseCartCommand({ version }), requestId);
  }
  async report(context: AuthorizationContext, orderId: string, shipmentId: string, command: ShipmentIssueCommand, requestId: string) {
    return this.mutate(context, orderId, shipmentId, parseShipmentIssue(command), requestId);
  }
  private async mutate(context: AuthorizationContext, orderId: string, shipmentId: string,
    command: { version: number } | ShipmentIssueCommand, requestId: string) {
    this.customer(context);
    return this.db.$transaction(async tx => {
      // Parameterized SQL: identifiers and ownership are checked before the order lock.
      const rows = await tx.$queryRawUnsafe<Array<{ id: string }>>('SELECT o."id" FROM "customer_orders" o JOIN "artist_shipment_reports" s ON s."orderId" = o."id" WHERE o."id" = $1::uuid AND o."userId" = $2::uuid AND s."id" = $3::uuid FOR UPDATE OF o', orderId, context.userId, shipmentId);
      if (!rows.length) throw new NotFoundException();
      const s = await tx.artistShipmentReport.findUniqueOrThrow({ where: { id: shipmentId }, include });
      if (s.preparation.order.status !== "placed" || s.preparation.order.paymentStatus !== "paid") throw new NotFoundException();
      const issue = "kind" in command ? command : null;
      if (issue && s.issue) {
        if (s.issue.commandVersion === issue.version && s.issue.kind === issue.kind && s.issue.description === issue.description) return shipmentView(s);
        throw new ConflictException("shipment-issue-already-reported");
      }
      if (!issue && s.receipt) {
        if (s.receipt.commandVersion === command.version) return shipmentView(s);
        throw new ConflictException("shipment-receipt-already-confirmed");
      }
      if (s.customerVersion !== command.version) throw new ConflictException("shipment-state-changed");
      if (s.customerVersion === 2147483647) throw new ConflictException("shipment-version-exhausted");
      if (!issue && s.issue) throw new ConflictException("shipment-has-open-issue");
      if (issue?.kind === "not_received" && s.receipt) throw new ConflictException("shipment-already-received");
      await tx.artistShipmentReport.update({ where: { id: shipmentId }, data: { customerVersion: { increment: 1 } } });
      // Immutable outcome rows are the private audit; timestamps and author come from the server/session.
      const data = { shipmentId, commandVersion: command.version, customerUserId: context.userId, requestId };
      if (issue) await tx.customerShipmentIssue.create({ data: { ...data, kind: issue.kind, description: issue.description } });
      else await tx.customerShipmentReceipt.create({ data });
      return shipmentView(await tx.artistShipmentReport.findUniqueOrThrow({ where: { id: shipmentId }, include }));
    });
  }
}
