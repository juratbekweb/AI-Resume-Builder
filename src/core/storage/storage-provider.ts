export interface IStorageProvider {
  /**
   * Upload a file and return its public or accessible URL
   */
  uploadFile(file: Buffer | Blob | File, path: string, contentType: string): Promise<string>;

  /**
   * Delete a file by its path or URL
   */
  deleteFile(pathOrUrl: string): Promise<boolean>;

  /**
   * Get a signed URL for temporary access (if applicable)
   */
  getSignedUrl(path: string, expiresInSeconds?: number): Promise<string>;
}
