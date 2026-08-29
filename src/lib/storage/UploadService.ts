export interface UploadService {
  /**
   * Uploads a file and returns its public URL
   */
  uploadFile(file: File, pathPrefix: string): Promise<string>;

  /**
   * Deletes a file by its URL
   */
  deleteFile(url: string): Promise<void>;
}
