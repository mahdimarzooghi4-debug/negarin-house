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
  createReadUrl(objectKey: string): Promise<string>;
  deleteObject(objectKey: string): Promise<void>;
}
