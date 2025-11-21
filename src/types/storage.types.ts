export type StorageUploadParams = {
  bucket: string;
  path: string;      
  data: Buffer;
  mime: string;
};

export interface IStorageService {
  upload(params: StorageUploadParams): Promise<void>;
  listBuckets(): Promise<string[]>;
}
