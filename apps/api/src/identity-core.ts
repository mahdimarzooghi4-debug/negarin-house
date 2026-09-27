import { createHash, createHmac, randomBytes, randomInt, randomUUID, timingSafeEqual } from "node:crypto";
import type { PrismaService } from "./prisma.service.js";

export interface OtpTransport {
  send(phone: string, code: string): Promise<void>;
}

export class IdentityError extends Error {
  constructor(readonly code: "invalid-phone" | "rate-limited" | "invalid-code") {
    super(code);
  }
}

const OTP_LIFETIME_MS = 5 * 60_000;
const RESEND_INTERVAL_MS = 60_000;
const REQUEST_WINDOW_MS = 60 * 60_000;
const MAX_REQUESTS_PER_WINDOW = 5;
const MAX_VERIFICATION_ATTEMPTS = 5;
const SESSION_LIFETIME_MS = 24 * 60 * 60_000;

export function hashOtp(secret: string, challengeId: string, phone: string, code: string): string {
  return createHmac("sha256", secret).update(`${challengeId}:${phone}:${code}`).digest("hex");
}

export function hashSessionToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

function matchesDigest(actual: string, expected: string): boolean {
  const actualBytes = Buffer.from(actual, "hex");
  const expectedBytes = Buffer.from(expected, "hex");
  return actualBytes.length === expectedBytes.length && timingSafeEqual(actualBytes, expectedBytes);
}

/** Core persistence only. No public route is enabled until a real OTP transport and HTTP controls exist. */
export class IdentityCore {
  constructor(
    private readonly database: PrismaService,
    private readonly transport: OtpTransport,
    private readonly otpSecret: string
  ) {
    if (otpSecret.length < 32) throw new Error("OTP secret must have at least 32 characters");
  }

  async requestCode(phone: string, now = new Date()): Promise<void> {
    if (!/^\+[1-9]\d{7,14}$/.test(phone)) throw new IdentityError("invalid-phone");

    const code = randomInt(0, 1_000_000).toString().padStart(6, "0");
    const result = await this.retryTransaction(() => this.database.$transaction(async (tx) => {
      const existing = await tx.otpChallenge.findUnique({ where: { phone } });
      const withinWindow = existing && now.getTime() - existing.windowStartedAt.getTime() < REQUEST_WINDOW_MS;
      if (existing && (existing.nextRequestAt > now || (withinWindow && existing.requestCount >= MAX_REQUESTS_PER_WINDOW))) {
        return "rate-limited" as const;
      }

      const id = existing?.id ?? randomUUID();
      const fields = {
        codeHash: hashOtp(this.otpSecret, id, phone, code),
        expiresAt: new Date(now.getTime() + OTP_LIFETIME_MS),
        consumedAt: null,
        failedAttempts: 0,
        requestCount: withinWindow ? existing.requestCount + 1 : 1,
        windowStartedAt: withinWindow ? existing.windowStartedAt : now,
        nextRequestAt: new Date(now.getTime() + RESEND_INTERVAL_MS)
      };
      if (existing) {
        await tx.otpChallenge.update({ where: { id }, data: fields });
      } else {
        await tx.otpChallenge.create({ data: { id, phone, ...fields } });
      }
      return "issued" as const;
    }, { isolationLevel: "Serializable" }));

    if (result === "rate-limited") throw new IdentityError("rate-limited");
    await this.transport.send(phone, code);
  }

  async verifyCode(phone: string, code: string, now = new Date()): Promise<{ userId: string; sessionToken: string }> {
    if (!/^\+[1-9]\d{7,14}$/.test(phone) || !/^\d{6}$/.test(code)) throw new IdentityError("invalid-code");

    const sessionToken = randomBytes(32).toString("base64url");
    const result = await this.retryTransaction(() => this.database.$transaction(async (tx) => {
      const challenge = await tx.otpChallenge.findUnique({ where: { phone } });
      if (!challenge || challenge.consumedAt || challenge.expiresAt <= now || challenge.failedAttempts >= MAX_VERIFICATION_ATTEMPTS) {
        return null;
      }

      const match = matchesDigest(hashOtp(this.otpSecret, challenge.id, phone, code), challenge.codeHash);
      const updated = await tx.otpChallenge.updateMany({
        where: {
          id: challenge.id,
          codeHash: challenge.codeHash,
          consumedAt: null,
          expiresAt: { gt: now },
          failedAttempts: challenge.failedAttempts
        },
        data: match ? { consumedAt: now } : { failedAttempts: { increment: 1 } }
      });
      if (updated.count !== 1 || !match) return null;

      const user = await tx.identityUser.upsert({ where: { phone }, create: { phone }, update: {} });
      await tx.authSession.create({ data: {
        userId: user.id,
        tokenHash: hashSessionToken(sessionToken),
        expiresAt: new Date(now.getTime() + SESSION_LIFETIME_MS)
      } });
      return { userId: user.id, sessionToken };
    }, { isolationLevel: "Serializable" }));

    if (!result) throw new IdentityError("invalid-code");
    return result;
  }

  async resolveSession(token: string, now = new Date()): Promise<{ userId: string } | null> {
    if (!token) return null;
    const session = await this.database.authSession.findUnique({ where: { tokenHash: hashSessionToken(token) } });
    if (!session || session.revokedAt || session.expiresAt <= now) return null;
    return { userId: session.userId };
  }

  async revokeSession(token: string, now = new Date()): Promise<void> {
    if (!token) return;
    await this.database.authSession.updateMany({
      where: { tokenHash: hashSessionToken(token), revokedAt: null },
      data: { revokedAt: now }
    });
  }

  private async retryTransaction<T>(action: () => Promise<T>): Promise<T> {
    for (let attempt = 0; ; attempt++) {
      try {
        return await action();
      } catch (error) {
        const code = error && typeof error === "object" && "code" in error ? error.code : null;
        const cause = error && typeof error === "object" && "cause" in error ? error.cause : null;
        const originalCode = cause && typeof cause === "object" && "originalCode" in cause ? cause.originalCode
          : error && typeof error === "object" && "originalCode" in error ? error.originalCode : null;
        if (attempt >= 4 || (code !== "P2034" && code !== "P2002" && originalCode !== "40001")) {
          throw error;
        }
        await new Promise((resolve) => setTimeout(resolve, 10 * (attempt + 1)));
      }
    }
  }
}
