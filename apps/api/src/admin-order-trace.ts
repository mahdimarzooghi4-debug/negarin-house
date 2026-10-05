import { Injectable, NotFoundException } from "@nestjs/common";
import { canAccessStaffDomain, type AuthorizationContext } from "@negarin/authz";
import { enforceDecision } from "./authorization.guard.js";
import { PrismaService } from "./prisma.service.js";

@Injectable()
export class AdminOrderTraceService {
  constructor(private readonly db: PrismaService) {}

  async get(context: AuthorizationContext, orderId: string) {
    enforceDecision(canAccessStaffDomain(context, "orders"));

    return this.db.$transaction(async tx => {
      const order = await tx.customerOrder.findUnique({
        where: { id: orderId },
        select: {
          id: true, status: true, version: true, paymentStatus: true, subtotalToman: true,
          reservedUntil: true, releasedAt: true, paidAt: true, createdAt: true,
          payableQuote: { select: { shippingFeeToman: true, payableToman: true, expiresAt: true, createdAt: true } },
          items: {
            orderBy: { productId: "asc" },
            select: { productId: true, artistUserId: true, title: true, quantity: true, unitPriceToman: true }
          }
        }
      });
      if (!order) throw new NotFoundException();

      const [payments, preparations, inventory, financial] = await Promise.all([
        tx.paymentAttempt.findMany({
          where: { orderId },
          orderBy: [{ createdAt: "asc" }, { id: "asc" }],
          select: {
            id: true, status: true, version: true, provider: true, amountToman: true, createdAt: true, updatedAt: true,
            receipt: { select: { id: true, amount: true, unit: true, receivedAt: true } },
            events: {
              orderBy: { version: "asc" },
              select: { version: true, status: true, reason: true, actorUserId: true, createdAt: true }
            }
          }
        }),
        tx.artistOrderPreparation.findMany({
          where: { orderId },
          orderBy: { artistUserId: "asc" },
          select: {
            artistUserId: true, status: true, version: true, updatedAt: true,
            events: {
              orderBy: { version: "asc" },
              select: { version: true, fromStatus: true, toStatus: true, actorUserId: true, createdAt: true }
            },
            shipment: {
              select: {
                id: true, preparationVersion: true, carrierName: true, trackingCode: true, reportedAt: true, reportedByUserId: true,
                receipt: { select: { commandVersion: true, customerUserId: true, receivedAt: true } },
                issue: {
                  select: {
                    kind: true, description: true, status: true, version: true, resolution: true, resolutionSummary: true,
                    customerUserId: true, reportedAt: true,
                    events: {
                      orderBy: { version: "asc" },
                      select: { version: true, fromStatus: true, toStatus: true, resolution: true, summary: true, actorUserId: true, createdAt: true }
                    },
                    refundReviews: {
                      orderBy: { reviewedAt: "asc" },
                      select: {
                        id: true, issueVersion: true, decision: true, amountToman: true, reason: true,
                        actorUserId: true, reviewedAt: true, receiptId: true
                      }
                    }
                  }
                }
              }
            }
          }
        }),
        tx.productInventoryEvent.findMany({
          where: { orderId },
          orderBy: [{ createdAt: "asc" }, { id: "asc" }],
          select: {
            id: true, productId: true, actorUserId: true, previousQuantity: true,
            stockQuantity: true, inventoryVersion: true, reason: true, createdAt: true
          }
        }),
        tx.financialEvent.findMany({
          where: { orderId },
          orderBy: [{ occurredAt: "asc" }, { id: "asc" }],
          select: {
            id: true, kind: true, artistUserId: true, paymentReceiptId: true, refundReviewId: true,
            amountToman: true, actorUserId: true, occurredAt: true, recordedAt: true
          }
        })
      ]);

      return {
        order: {
          id: order.id, status: order.status, version: order.version, paymentStatus: order.paymentStatus,
          subtotalToman: order.subtotalToman, reservedUntil: order.reservedUntil.toISOString(),
          releasedAt: order.releasedAt?.toISOString() ?? null, paidAt: order.paidAt?.toISOString() ?? null,
          createdAt: order.createdAt.toISOString(),
          quote: order.payableQuote ? {
            shippingFeeToman: order.payableQuote.shippingFeeToman,
            payableToman: order.payableQuote.payableToman,
            expiresAt: order.payableQuote.expiresAt.toISOString(),
            createdAt: order.payableQuote.createdAt.toISOString()
          } : null,
          items: order.items.map(item => ({
            productId: item.productId, artistUserId: item.artistUserId, title: item.title, quantity: item.quantity,
            unitPriceToman: item.unitPriceToman.toString(),
            lineSubtotalToman: (item.unitPriceToman * BigInt(item.quantity)).toString()
          }))
        },
        payment: payments.map(attempt => ({
          id: attempt.id, status: attempt.status, version: attempt.version, provider: attempt.provider,
          amountToman: attempt.amountToman, createdAt: attempt.createdAt.toISOString(), updatedAt: attempt.updatedAt.toISOString(),
          receipt: attempt.receipt ? {
            id: attempt.receipt.id, amount: attempt.receipt.amount, unit: attempt.receipt.unit,
            receivedAt: attempt.receipt.receivedAt.toISOString()
          } : null,
          history: attempt.events.map(event => ({
            version: event.version, status: event.status, reason: event.reason, actorUserId: event.actorUserId,
            createdAt: event.createdAt.toISOString()
          }))
        })),
        fulfillment: preparations.map(preparation => ({
          artistUserId: preparation.artistUserId, status: preparation.status, version: preparation.version,
          updatedAt: preparation.updatedAt.toISOString(),
          history: preparation.events.map(event => ({
            version: event.version, fromStatus: event.fromStatus, toStatus: event.toStatus,
            actorUserId: event.actorUserId, createdAt: event.createdAt.toISOString()
          })),
          shipment: preparation.shipment ? {
            id: preparation.shipment.id, preparationVersion: preparation.shipment.preparationVersion,
            carrierName: preparation.shipment.carrierName, trackingCode: preparation.shipment.trackingCode,
            reportedAt: preparation.shipment.reportedAt.toISOString(), reportedByUserId: preparation.shipment.reportedByUserId,
            receipt: preparation.shipment.receipt ? {
              commandVersion: preparation.shipment.receipt.commandVersion,
              customerUserId: preparation.shipment.receipt.customerUserId,
              receivedAt: preparation.shipment.receipt.receivedAt.toISOString()
            } : null,
            issue: preparation.shipment.issue ? {
              kind: preparation.shipment.issue.kind, description: preparation.shipment.issue.description,
              status: preparation.shipment.issue.status, version: preparation.shipment.issue.version,
              resolution: preparation.shipment.issue.resolution,
              resolutionSummary: preparation.shipment.issue.resolutionSummary,
              customerUserId: preparation.shipment.issue.customerUserId,
              reportedAt: preparation.shipment.issue.reportedAt.toISOString(),
              history: preparation.shipment.issue.events.map(event => ({
                version: event.version, fromStatus: event.fromStatus, toStatus: event.toStatus,
                resolution: event.resolution, summary: event.summary, actorUserId: event.actorUserId,
                createdAt: event.createdAt.toISOString()
              })),
              refundReviews: preparation.shipment.issue.refundReviews.map(review => ({
                id: review.id, issueVersion: review.issueVersion, decision: review.decision,
                amountToman: review.amountToman, reason: review.reason, actorUserId: review.actorUserId,
                receiptId: review.receiptId, reviewedAt: review.reviewedAt.toISOString()
              }))
            } : null
          } : null
        })),
        inventory: inventory.map(event => ({
          id: event.id, productId: event.productId, actorUserId: event.actorUserId,
          previousQuantity: event.previousQuantity, stockQuantity: event.stockQuantity,
          inventoryVersion: event.inventoryVersion, reason: event.reason, createdAt: event.createdAt.toISOString()
        })),
        finance: financial.map(event => ({
          id: event.id, kind: event.kind, artistUserId: event.artistUserId,
          paymentReceiptId: event.paymentReceiptId, refundReviewId: event.refundReviewId,
          amountToman: event.amountToman, actorUserId: event.actorUserId,
          occurredAt: event.occurredAt.toISOString(), recordedAt: event.recordedAt.toISOString()
        }))
      };
    }, { isolationLevel: "RepeatableRead" });
  }
}
