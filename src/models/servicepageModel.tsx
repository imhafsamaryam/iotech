export interface Paragraph {
  id: number;
  para: string;
}

export interface BulletPoint {
  id: number;
  point: string;
}

export interface ContentItem {
  __component: string;
  id: number;
  sideHeading: string | null;
  paragraphs: Paragraph[];
  bulletpoints: BulletPoint[];
}

export interface ServicePageResponse {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  content: ContentItem[];
}
