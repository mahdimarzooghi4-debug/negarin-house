import { beforeEach, describe, expect, it, vi } from "vitest";
vi.mock("../api/client", () => ({ apiJson: vi.fn() }));
import { apiJson } from "../api/client";
import { parseProfile, profileCommand, saveProfile } from "./profile";
const profile = { version: 2, displayName: "خریدار", phone: "+989123456789" };
beforeEach(() => vi.mocked(apiJson).mockReset());
describe("customer native profile", () => {
  it("accepts initial empty names and rejects malformed or directional control input", () => {
    expect(parseProfile({ ...profile, displayName: "" }).displayName).toBe("");
    for (const bad of [{ version: -1 }, { phone: "09123456789" }, { displayName: " نام " }, { displayName: "نام\u202e" }]) expect(() => parseProfile({ ...profile, ...bad })).toThrow();
    expect(() => profileCommand(profile, "\u2066نام")).toThrow();
    expect(() => profileCommand(profile, " ")).toThrow();
    expect(profileCommand(profile, " نام تازه ")).toEqual({ version: 2, displayName: "نام تازه" });
  });
  it("pins updates to the current revision and verifies a fresh backend read", async () => {
    const updated = { ...profile, version: 3, displayName: "نام تازه" };
    vi.mocked(apiJson).mockResolvedValueOnce(updated).mockResolvedValueOnce(updated);
    await expect(saveProfile("token", profile, "نام تازه")).resolves.toEqual(updated);
    expect(apiJson).toHaveBeenNthCalledWith(1, "/api/v1/customer/profile", "token", { method: "PUT", body: JSON.stringify({ version: 2, displayName: "نام تازه" }) });
    expect(apiJson).toHaveBeenNthCalledWith(2, "/api/v1/customer/profile", "token", { signal: undefined });
  });
  it("does not claim success on mismatched acknowledgement or a changed readback", async () => {
    vi.mocked(apiJson).mockResolvedValueOnce({ ...profile, version: 3 });
    await expect(saveProfile("token", profile, "نام تازه")).rejects.toThrow();
    expect(apiJson).toHaveBeenCalledTimes(1);
    vi.mocked(apiJson).mockReset().mockResolvedValueOnce({ ...profile, version: 3, displayName: "نام تازه" }).mockResolvedValueOnce({ ...profile, version: 4 });
    await expect(saveProfile("token", profile, "نام تازه")).rejects.toThrow();
  });
  it("does not replay uncertain writes", async () => {
    vi.mocked(apiJson).mockRejectedValueOnce(new Error("connection lost"));
    await expect(saveProfile("token", profile, "نام تازه")).rejects.toThrow("connection lost");
    expect(apiJson).toHaveBeenCalledTimes(1);
  });
});
