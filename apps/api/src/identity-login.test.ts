import "reflect-metadata";
import { describe, expect, it, vi } from "vitest";
vi.mock("./prisma.service.js", () => ({ PrismaService: class {} }));
import { IdentityLoginController, LoginDelivery, loginBody } from "./identity-login.controller.js";
import type { PrismaService } from "./prisma.service.js";

describe("public login boundary", () => {
  it("rejects malformed bodies and privilege fields", () => {
    for (const body of [null, [], { phone: "09123456789" }, { phone: "+989123456789", role: "artist" }]) {
      expect(() => loginBody(body, false)).toThrow();
    }
    expect(() => loginBody({ phone: "+989123456789", code: "12345" }, true)).toThrow();
    expect(loginBody({ phone: "+989123456789", code: "123456" }, true).code).toBe("123456");
  });
  it("keeps both endpoints unavailable without a configured transport, without database writes", async () => {
    const controller = new IdentityLoginController({} as PrismaService, new LoginDelivery());
    await expect(controller.request({ phone: "+989123456789" })).rejects.toMatchObject({ status: 503 });
    await expect(controller.verify({ phone: "+989123456789", code: "123456" })).rejects.toMatchObject({ status: 503 });
  });
});
