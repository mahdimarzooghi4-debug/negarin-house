import { createServer } from "node:http";
import type { AddressInfo } from "node:net";
import { describe, expect, it } from "vitest";
import { S3ObjectStorage } from "./index.js";

const storage = new S3ObjectStorage({
  endpoint: "http://localhost:9000",
  region: "us-east-1",
  bucket: "negarin-local",
  accessKeyId: "negarin",
  secretAccessKey: "negarin-local-secret",
  forcePathStyle: true,
  signedUrlExpiresSeconds: 60
});

describe("S3ObjectStorage", () => {
  it("creates a signed upload URL without contacting the storage service", async () => {
    const result = await storage.createUploadUrl({
      objectKey: "tests/sample.txt",
      contentType: "text/plain",
      contentLength: 4
    });

    expect(result.objectKey).toBe("tests/sample.txt");
    expect(result.url).toContain("localhost:9000");
    expect(result.url).toContain("negarin-local");
    expect(result.url).toContain("X-Amz-Signature");
  });

  it("rejects invalid upload metadata", async () => {
    await expect(
      storage.createUploadUrl({
        objectKey: "",
        contentType: "text/plain",
        contentLength: 0
      })
    ).rejects.toThrow("Invalid upload request");
  });
});

describe("immutable object transport", () => {
  it("sends conditional signed writes and refuses replacement", async () => {
    let stored: Buffer | undefined;
    const server = createServer(async (request, response) => {
      expect(request.headers["if-none-match"]).toBe("*");
      expect(request.headers["content-type"]).toBe("image/webp");
      expect(request.headers.authorization).toContain("AWS4-HMAC-SHA256");
      const chunks: Buffer[] = [];
      for await (const chunk of request) chunks.push(Buffer.from(chunk));
      if (stored) { response.writeHead(412); response.end('<Error><Code>PreconditionFailed</Code></Error>'); }
      else { stored = Buffer.concat(chunks); response.writeHead(200); response.end(); }
    });
    await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
    try {
      const adapter = new S3ObjectStorage({ endpoint: `http://127.0.0.1:${(server.address() as AddressInfo).port}`, region: "us-east-1",
        bucket: "test", accessKeyId: "test", secretAccessKey: "test" });
      await adapter.putImmutableObject("image.webp", Buffer.from("pixels"), "image/webp");
      expect(stored?.toString()).toBe("pixels");
      await expect(adapter.putImmutableObject("image.webp", Buffer.from("replacement"), "image/webp")).rejects.toThrow();
      expect(stored?.toString()).toBe("pixels");
    } finally { await new Promise<void>((resolve, reject) => server.close((error) => error ? reject(error) : resolve())); }
  });
});
