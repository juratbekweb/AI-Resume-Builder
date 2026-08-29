export enum DocumentType {
  RESUME = "RESUME",
  CV = "CV",
  COVER_LETTER = "COVER_LETTER",
  CONTRACT = "CONTRACT",
  CERTIFICATE = "CERTIFICATE",
  APPLICATION = "APPLICATION",
  REPORT = "REPORT",
}

export enum DocumentStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED",
}

export type SectionType = 
  | "personal_info" 
  | "experience" 
  | "education" 
  | "skills" 
  | "projects" 
  | "certificates" 
  | "languages" 
  | "summary" 
  | "custom";

export interface SectionContent<T = Record<string, unknown>> {
  data: T;
}

export interface DocumentSnapshot {
  document: Record<string, unknown>;
  sections: Record<string, unknown>[];
  metadata: Record<string, unknown>;
  timestamp: string;
}

export interface DocumentWithSections {
  id: string;
  type: DocumentType;
  title: string;
  slug: string;
  status: DocumentStatus;
  sections: Record<string, unknown>[];
  folderId?: string | null;
  tags: string[];
  metadata: Record<string, unknown>[];
  updatedAt: Date;
  createdAt: Date;
}
