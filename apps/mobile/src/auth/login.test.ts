import { describe, expect, it, vi } from "vitest";
vi.mock("../api/client", () => ({ apiJson: vi.fn() }));
import { apiJson } from "../api/client";
import { normalizeCode, normalizePhone, requestLogin, verifyLogin } from "./login";

describe("mobile login", () => {
  it("normalizes Persian and Arabic digits and rejects invalid phone input", () => {
    expect(normalizePhone("۰۹۱۲۳۴۵۶۷۸۹")).toBe("+989123456789");
    expect(normalizePhone("٠٩١٢٣٤٥٦٧٨٩")).toBe("+989123456789");
    expect(normalizePhone("+989123456789")).toBe("+989123456789");
    expect(normalizePhone("09123")).toBeNull();
    expect(normalizeCode("۱۲٣۴۵۶")).toBe("123456");
  });
  it("uses unauthenticated OTP contracts and rejects malformed sessions", async () => {
    vi.mocked(apiJson).mockResolvedValueOnce({ retryAfterSeconds: 60 });
    await requestLogin("+989123456789");
    expect(apiJson).toHaveBeenLastCalledWith("/api/v1/identity/otp/request", null, { method: "POST", body: '{"phone":"+989123456789"}' });
    vi.mocked(apiJson).mockResolvedValueOnce({ sessionToken: "bad" });
    await expect(verifyLogin("+989123456789", "123456")).rejects.toThrow();
    vi.mocked(apiJson).mockResolvedValueOnce({ sessionToken: "a".repeat(43) });
    expect(await verifyLogin("+989123456789", "123456")).toBe("a".repeat(43));
  });
});
