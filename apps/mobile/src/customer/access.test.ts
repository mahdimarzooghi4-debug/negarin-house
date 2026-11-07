import { beforeEach, describe, expect, it, vi } from "vitest";
vi.mock("../api/client", () => ({ apiJson: vi.fn() }));
import { apiJson } from "../api/client";
import { discoverCustomerAccess, selectCustomerGrant } from "../auth/identity";
const id = "11111111-1111-4111-8111-111111111111";
const userId = "22222222-2222-4222-8222-222222222222";
const grant = { id, role: "customer", organizationId: null, exportPartnerId: null };
beforeEach(() => vi.mocked(apiJson).mockReset());
describe("customer native access", () => {
  it("never treats an artist grant as customer access", async () => {
    vi.mocked(apiJson).mockResolvedValue({ activeGrantId: id, grants: [{ ...grant, role: "artist" }] });
    expect(await discoverCustomerAccess("token")).toEqual({ kind: "missing" });
    expect(apiJson).toHaveBeenCalledTimes(1);
  });
  it("requires explicit selection when the customer grant is not active", async () => {
    vi.mocked(apiJson).mockResolvedValue({ activeGrantId: null, grants: [grant] });
    expect(await discoverCustomerAccess("token")).toEqual({ kind: "choose", grants: [grant] });
    expect(apiJson).toHaveBeenCalledTimes(1);
  });
  it("checks the live context even when discovery says customer is selected", async () => {
    vi.mocked(apiJson).mockResolvedValueOnce({ activeGrantId: id, grants: [grant] }).mockResolvedValueOnce({ userId, activeRole: "artist" });
    await expect(discoverCustomerAccess("token")).rejects.toThrow();
  });
  it("rejects invalid selection and wrong-role acknowledgements", async () => {
    await expect(selectCustomerGrant("token", "bad")).rejects.toThrow();
    expect(apiJson).not.toHaveBeenCalled();
    vi.mocked(apiJson).mockResolvedValueOnce({ userId, activeRole: "artist" });
    await expect(selectCustomerGrant("token", id)).rejects.toThrow();
    vi.mocked(apiJson).mockResolvedValueOnce({ userId, activeRole: "customer" });
    await expect(selectCustomerGrant("token", id)).resolves.toEqual({ userId, activeRole: "customer" });
  });
});
