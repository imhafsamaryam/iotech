export interface Paragraph {
  id: number;
  para: string;
}

export interface SectionBlock {
  __component: string;
  id: number;
  sideHeading: string;
  paragraphs: Paragraph[];
}

export interface HeadingsModel {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  headings: SectionBlock[];
}
