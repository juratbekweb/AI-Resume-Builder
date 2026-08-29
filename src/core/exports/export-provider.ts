export type ExportFormat = 'pdf' | 'docx' | 'html' | 'json';

export interface ExportOptions {
  format: ExportFormat;
  templateId?: string;
  includeMetadata?: boolean;
}

export interface IExportProvider {
  /**
   * The format this provider supports
   */
  readonly supportedFormats: ExportFormat[];

  /**
   * Export the document snapshot into a buffer
   */
  export(documentData: unknown, options: ExportOptions): Promise<Buffer>;
}
