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
