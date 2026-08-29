import { UploadService } from "./UploadService";
import { LocalStorageAdapter } from "./LocalStorageAdapter";

// In the future, this can be switched based on environment variables.
// E.g., if (process.env.STORAGE_PROVIDER === "s3") return new S3StorageAdapter();
export const storage: UploadService = new LocalStorageAdapter();
