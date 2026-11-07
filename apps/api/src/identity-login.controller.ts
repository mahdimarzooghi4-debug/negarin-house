import { BadRequestException, Body, Controller, Header, HttpCode, HttpException, Injectable, Post, ServiceUnavailableException, UnauthorizedException } from "@nestjs/common";
import { IdentityCore, IdentityError, type OtpTransport } from "./identity-core.js";
import { PrismaService } from "./prisma.service.js";

/** Replace through dependency injection when the approved delivery provider is configured. */
@Injectable()
export class LoginDelivery implements OtpTransport {
  get available(): boolean { return false; }
  async send(_phone: string, _code: string): Promise<void> {
    throw new ServiceUnavailableException("Login delivery is not configured");
  }
}

export function loginBody(body: unknown, verify: boolean): { phone: string; code: string } {
  if (!body || typeof body !== "object" || Array.isArray(body)) throw new BadRequestException();
  const value = body as Record<string, unknown>;
  if (Object.keys(value).some(key => !["phone", ...(verify ? ["code"] : [])].includes(key)) ||
    typeof value.phone !== "string" || !/^\+[1-9]\d{7,14}$/.test(value.phone) ||
    (verify && (typeof value.code !== "string" || !/^\d{6}$/.test(value.code)))) throw new BadRequestException();
  return { phone: value.phone, code: verify ? value.code as string : "" };
}

@Controller("identity/otp")
export class IdentityLoginController {
  constructor(private readonly database: PrismaService, private readonly delivery: LoginDelivery) {}

  private core(): IdentityCore {
    const secret = process.env.IDENTITY_OTP_SECRET ?? "";
    if (!this.delivery.available || secret.length < 32) throw new ServiceUnavailableException("Login delivery is not configured");
    return new IdentityCore(this.database, this.delivery, secret);
  }

  private failure(reason: unknown): never {
    if (!(reason instanceof IdentityError)) throw reason;
    if (reason.code === "rate-limited") throw new HttpException("Please wait before requesting another code", 429);
    if (reason.code === "invalid-code") throw new UnauthorizedException("Invalid or expired code");
    if (reason.code === "invalid-phone") throw new BadRequestException();
    throw new ServiceUnavailableException("Code delivery failed");
  }

  @Post("request")
  @HttpCode(202)
  @Header("Cache-Control", "no-store")
  async request(@Body() body: unknown) {
    const { phone } = loginBody(body, false);
    try { await this.core().requestCode(phone); return { retryAfterSeconds: 60 }; }
    catch (reason) { this.failure(reason); }
  }

  @Post("verify")
  @HttpCode(200)
  @Header("Cache-Control", "no-store")
  async verify(@Body() body: unknown) {
    const { phone, code } = loginBody(body, true);
    try { return await this.core().verifyCode(phone, code); }
    catch (reason) { this.failure(reason); }
  }
}
