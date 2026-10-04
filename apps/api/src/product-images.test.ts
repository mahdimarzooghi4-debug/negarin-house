import { randomUUID } from "node:crypto";
import { describe, expect, it } from "vitest";
import sharp from "sharp";
import { BadRequestException } from "@nestjs/common";
import { maxImageBytes, normalizeProductImage, parseImageCommand } from "./product-images.js";

describe("Product image input", () => {
  it.each(["jpeg", "png", "webp"] as const)("decodes %s and normalizes immutable WebP", async (format) => {
    const input = await sharp({ create: { width: 12, height: 9, channels: 3, background: "red" } }).toFormat(format).toBuffer();
    const output = await normalizeProductImage(input);
    expect(output).toMatchObject({ width: 12, height: 9 });
    const meta = await sharp(output.data).metadata();
    expect(meta.format).toBe("webp"); expect(meta.exif).toBeUndefined();
  });
  it("rejects disguised SVG, corrupt images and excessive pixel counts", async () => {
    await expect(normalizeProductImage(Buffer.from('<svg width="10" height="10"></svg>'))).rejects.toThrow(BadRequestException);
    await expect(normalizeProductImage(Buffer.from("not an image"))).rejects.toThrow(BadRequestException);
    const large = await sharp({ create: { width: 4001, height: 4000, channels: 3, background: "white" } }).png().toBuffer();
    await expect(normalizeProductImage(large)).rejects.toThrow(BadRequestException);
    const valid = await sharp({ create: { width: 20, height: 20, channels: 3, background: "red" } }).png().toBuffer();
    await expect(normalizeProductImage(valid.subarray(0, 45))).rejects.toThrow(BadRequestException);
  });
  it("rejects animated WebP and strips EXIF from normal photos", async () => {
    const red = await sharp({ create: { width: 10, height: 10, channels: 3, background: "red" } }).png().toBuffer();
    const blue = await sharp({ create: { width: 10, height: 10, channels: 3, background: "blue" } }).png().toBuffer();
    const animated = await sharp([red, blue], { join: { animated: true } }).webp({ delay: [100, 100] }).toBuffer();
    expect((await sharp(animated).metadata()).pages).toBe(2);
    await expect(normalizeProductImage(animated)).rejects.toThrow(BadRequestException);
    const photo = await sharp({ create: { width: 10, height: 20, channels: 3, background: "red" } }).withMetadata({ orientation: 6 }).jpeg().toBuffer();
    const normalized = await normalizeProductImage(photo);
    expect(normalized).toMatchObject({ width: 20, height: 10 });
    expect((await sharp(normalized.data).metadata()).exif).toBeUndefined();
  });
  it("bounds and canonicalizes base64 without accepting data URLs or remote sources", () => {
    for (const base64 of ["", "AA", "AB==", "AAAA=", "data:image/png;base64,AAAA", "https://example.com/a.png", "!", "A".repeat(Math.ceil(maxImageBytes / 3) * 4 + 4)]) {
      expect(() => parseImageCommand({ version: 0, base64 }, true)).toThrow(BadRequestException);
    }
    const bytes = Buffer.alloc(maxImageBytes, 1);
    const parsed = parseImageCommand({ version: 0, base64: bytes.toString("base64") }, true).bytes;
    expect(parsed.length).toBe(maxImageBytes); expect(parsed[0]).toBe(1); expect(parsed.at(-1)).toBe(1);
  });
  it("rejects duplicate/foreign-shaped IDs, oversized galleries and privilege fields", () => {
    const id = randomUUID();
    expect(parseImageCommand({ version: 0, imageIds: [] }, false).imageIds).toEqual([]);
    for (const imageIds of [[id, id.toUpperCase()], ["invalid"], [123], Array.from({ length: 9 }, randomUUID), null]) {
      expect(() => parseImageCommand({ version: 0, imageIds }, false)).toThrow(BadRequestException);
    }
    expect(() => parseImageCommand({ version: 0, base64: "AAAA", objectKey: "foreign" }, true)).toThrow(BadRequestException);
    expect(() => parseImageCommand({ version: "0", imageIds: [] }, false)).toThrow(BadRequestException);
  });
});
