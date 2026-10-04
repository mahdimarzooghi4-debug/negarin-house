import { Logger } from "@nestjs/common";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CustomerOrdersService } from "./customer-orders.js";
import { OrderReservationExpiry } from "./order-reservation-expiry.js";
function setup(run = vi.fn().mockResolvedValue({ scanned: 0, failed: 0 })) {
  return { run, scheduler: new OrderReservationExpiry({ expirePending: run } as unknown as CustomerOrdersService) };
}
afterEach(() => { vi.useRealTimers(); vi.unstubAllEnvs(); vi.restoreAllMocks(); });
describe("Reservation expiry process lifecycle", () => {
  it("starts immediately, repeats and stops on shutdown", async () => {
    vi.useFakeTimers(); vi.stubEnv("NODE_ENV", "production"); const { run, scheduler } = setup();
    scheduler.onModuleInit(); await vi.advanceTimersByTimeAsync(0); expect(run).toHaveBeenCalledTimes(1);
    await vi.advanceTimersByTimeAsync(30_000); expect(run).toHaveBeenCalledTimes(2);
    await scheduler.onModuleDestroy(); await vi.advanceTimersByTimeAsync(60_000); expect(run).toHaveBeenCalledTimes(2);
  });
  it("does not overlap batches and waits for in-flight work during shutdown", async () => {
    let finish!: (value: { scanned: number; failed: number }) => void;
    const { run, scheduler } = setup(vi.fn(() => new Promise(resolve => { finish = resolve; })));
    const first = scheduler.tick(), second = scheduler.tick(); expect(run).toHaveBeenCalledTimes(1);
    let stopped = false; const shutdown = scheduler.onModuleDestroy().then(() => { stopped = true; });
    await Promise.resolve(); expect(stopped).toBe(false);
    finish({ scanned: 0, failed: 0 }); await Promise.all([first, second, shutdown]);
    expect(stopped).toBe(true); await scheduler.tick(); expect(run).toHaveBeenCalledTimes(1);
  });
  it("recovers from failures and logs no raw database error or private fields", async () => {
    const logger = vi.spyOn(Logger.prototype, "error").mockImplementation(() => {});
    const { run, scheduler } = setup(vi.fn().mockRejectedValueOnce(new Error("PRIVATE ADDRESS SECRET")).mockResolvedValue({ scanned: 2, failed: 1 }));
    await scheduler.tick(); await scheduler.tick(); expect(run).toHaveBeenCalledTimes(2);
    expect(JSON.stringify(logger.mock.calls)).not.toContain("PRIVATE"); expect(logger).toHaveBeenCalledTimes(2);
    await scheduler.onModuleDestroy();
  });
  it("keeps test applications free of background polling", async () => {
    vi.useFakeTimers(); vi.stubEnv("NODE_ENV", "test"); const { run, scheduler } = setup();
    scheduler.onModuleInit(); await vi.advanceTimersByTimeAsync(60000); expect(run).not.toHaveBeenCalled(); await scheduler.onModuleDestroy();
  });
});
