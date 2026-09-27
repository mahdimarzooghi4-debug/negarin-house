import "dotenv/config";
import { randomInt } from "node:crypto";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { hashSessionToken, IdentityCore, IdentityError, type OtpTransport } from "./identity-core.js";
import { PrismaService } from "./prisma.service.js";

describe("identity persistence", () => {
  const database = new PrismaService();
  const sent: Array<{ phone: string; code: string }> = [];
  const transport: OtpTransport = { async send(phone, code) { sent.push({ phone, code }); } };
  const identity = new IdentityCore(database, transport, "test-secret-with-at-least-thirty-two-characters");
  const phone = () => `+1555${randomInt(1_000_000, 9_999_999)}`;
  const start = new Date("2026-09-27T12:00:00.000Z");

  beforeAll(async () => database.$connect());
  afterAll(async () => database.$disconnect());

  it("stores only a digest, consumes OTP once, and revokes the opaque session", async () => {
    const number = phone();
    await identity.requestCode(number, start);
    const code = sent.at(-1)?.code ?? "";
    const challenge = await database.otpChallenge.findUniqueOrThrow({ where: { phone: number } });
    expect(challenge.codeHash).not.toContain(code);

    const verified = await identity.verifyCode(number, code, new Date(start.getTime() + 1000));
    expect(verified.sessionToken).toBeTruthy();
    const session = await database.authSession.findUniqueOrThrow({ where: { tokenHash: hashSessionToken(verified.sessionToken) } });
    expect(session.tokenHash).not.toBe(verified.sessionToken);
    expect(await identity.resolveSession(verified.sessionToken, new Date(start.getTime() + 2000))).toEqual({ userId: verified.userId });
    await expect(identity.verifyCode(number, code, new Date(start.getTime() + 3000))).rejects.toMatchObject({ code: "invalid-code" });
    await identity.revokeSession(verified.sessionToken, new Date(start.getTime() + 4000));
    expect(await identity.resolveSession(verified.sessionToken, new Date(start.getTime() + 5000))).toBeNull();
  });

  it("limits resend and failed attempts without issuing a session", async () => {
    const number = phone();
    await identity.requestCode(number, start);
    const actualCode = sent.at(-1)?.code ?? "";
    const wrongCode = actualCode === "000000" ? "111111" : "000000";
    await expect(identity.requestCode(number, new Date(start.getTime() + 1000))).rejects.toBeInstanceOf(IdentityError);
    for (let attempt = 0; attempt < 5; attempt++) {
      await expect(identity.verifyCode(number, wrongCode, new Date(start.getTime() + 2000 + attempt))).rejects.toMatchObject({ code: "invalid-code" });
    }
    await expect(identity.verifyCode(number, actualCode, new Date(start.getTime() + 3000))).rejects.toMatchObject({ code: "invalid-code" });
    expect(await database.authSession.count({ where: { user: { phone: number } } })).toBe(0);
  });
});
