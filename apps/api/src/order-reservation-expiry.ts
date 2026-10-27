import { Injectable, Logger, type OnModuleDestroy, type OnModuleInit } from "@nestjs/common";
import { CustomerOrdersService } from "./customer-orders.js";

@Injectable()
export class OrderReservationExpiry implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(OrderReservationExpiry.name);
  private timer?: ReturnType<typeof setInterval>;
  private running?: Promise<void>;
  private stopped = false;
  constructor(private readonly orders: CustomerOrdersService) {}
  onModuleInit() {
    // Integration tests exercise expiry explicitly using real PostgreSQL; no background race in tests.
    if (process.env.NODE_ENV === "test") return;
    void this.tick();
    this.timer = setInterval(() => void this.tick(), 30_000);
    this.timer.unref();
  }
  async tick(): Promise<void> {
    if (this.stopped) return;
    if (this.running) return this.running;
    this.running = (async () => {
      try {
        const result = await this.orders.expirePending();
        if (result.failed) this.logger.error(JSON.stringify({ event: "order.expiry.partial_failure", failed: result.failed }));
      } catch {
        // Do not log addresses, customer information or raw database errors.
        this.logger.error(JSON.stringify({ event: "order.expiry.failed" }));
      }
    })();
    try { await this.running; } finally { this.running = undefined; }
  }
  async onModuleDestroy() {
    this.stopped = true;
    if (this.timer) clearInterval(this.timer);
    await this.running;
  }
}
