import {
  CopyObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
  PutObjectCommand,
  S3Client
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export type UploadRequest = Readonly<{
  objectKey: string;
  contentType: string;
  contentLength: number;
}>;

export type SignedUpload = Readonly<{
  objectKey: string;
  url: string;
  expiresAt: string;
}>;

export type StoredObjectMetadata = Readonly<{
  contentType: string | null;
  contentLength: number;
}>;

export interface ObjectStorage {
  createUploadUrl(input: UploadRequest): Promise<SignedUpload>;
  createReadUrl(objectKey: string): Promise<string>;
  getObjectMetadata(objectKey: string): Promise<StoredObjectMetadata | null>;
  copyObject(sourceKey: string, destinationKey: string): Promise<void>;
  deleteObject(objectKey: string): Promise<void>;
}

export type S3ObjectStorageConfig = Readonly<{
  endpoint?: string;
  region: string;
  bucket: string;
  accessKeyId: string;
  secretAccessKey: string;
  forcePathStyle?: boolean;
  signedUrlExpiresSeconds?: number;
}>;

export class S3ObjectStorage implements ObjectStorage {
  private readonly client: S3Client;
  private readonly expiresIn: number;

  constructor(private readonly config: S3ObjectStorageConfig) {
    this.expiresIn = config.signedUrlExpiresSeconds ?? 900;
    this.client = new S3Client({
      endpoint: config.endpoint,
      region: config.region,
      forcePathStyle: config.forcePathStyle ?? Boolean(config.endpoint),
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey
      }
    });
  }

  async createUploadUrl(input: UploadRequest): Promise<SignedUpload> {
    if (!input.objectKey || input.contentLength <= 0 || !input.contentType) {
      throw new Error("Invalid upload request");
    }

    const command = new PutObjectCommand({
      Bucket: this.config.bucket,
      Key: input.objectKey,
      ContentType: input.contentType,
      ContentLength: input.contentLength
    });

    const url = await getSignedUrl(this.client, command, { expiresIn: this.expiresIn });

    return {
      objectKey: input.objectKey,
      url,
      expiresAt: new Date(Date.now() + this.expiresIn * 1000).toISOString()
    };
  }

  async createReadUrl(objectKey: string): Promise<string> {
    if (!objectKey) throw new Error("Object key is required");

    return getSignedUrl(
      this.client,
      new GetObjectCommand({ Bucket: this.config.bucket, Key: objectKey }),
      { expiresIn: this.expiresIn }
    );
  }

  async getObjectMetadata(objectKey: string): Promise<StoredObjectMetadata | null> {
    if (!objectKey) throw new Error("Object key is required");
    try {
      const result = await this.client.send(
        new HeadObjectCommand({ Bucket: this.config.bucket, Key: objectKey })
      );
      if (typeof result.ContentLength !== "number") throw new Error("Stored object has no content length");
      return { contentType: result.ContentType ?? null, contentLength: result.ContentLength };
    } catch (error) {
      if (error && typeof error === "object" && (
        ("name" in error && (error.name === "NotFound" || error.name === "NoSuchKey")) ||
        ("$metadata" in error && typeof error.$metadata === "object" && error.$metadata &&
          "httpStatusCode" in error.$metadata && error.$metadata.httpStatusCode === 404)
      )) return null;
      throw error;
    }
  }

  async copyObject(sourceKey: string, destinationKey: string): Promise<void> {
    if (!sourceKey || !destinationKey || sourceKey === destinationKey) {
      throw new Error("Invalid object copy request");
    }
    const encodedSource = sourceKey.split("/").map(encodeURIComponent).join("/");
    await this.client.send(new CopyObjectCommand({
      Bucket: this.config.bucket,
      Key: destinationKey,
      CopySource: `${this.config.bucket}/${encodedSource}`,
      MetadataDirective: "COPY"
    }));
  }

  async deleteObject(objectKey: string): Promise<void> {
    if (!objectKey) throw new Error("Object key is required");

    await this.client.send(
      new DeleteObjectCommand({
        Bucket: this.config.bucket,
        Key: objectKey
      })
    );
  }
}
