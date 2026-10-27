import {
  DeleteObjectCommand,
  GetObjectCommand,
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

export interface ObjectStorage {
  createUploadUrl(input: UploadRequest): Promise<SignedUpload>;
  putImmutableObject(objectKey: string, body: Uint8Array, contentType: string): Promise<void>;
  createReadUrl(objectKey: string): Promise<string>;
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

  async putImmutableObject(objectKey: string, body: Uint8Array, contentType: string): Promise<void> {
    if (!objectKey || !body.byteLength || !contentType) throw new Error("Invalid object");
    await this.client.send(new PutObjectCommand({
      Bucket: this.config.bucket, Key: objectKey, Body: body,
      ContentLength: body.byteLength, ContentType: contentType, IfNoneMatch: "*"
    }));
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
