export interface NavbarSubLink {
  id: number;
  documentId: string;
  Title: string;
  url: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
}
export interface NavbarModel {
  id: number;
  documentId: string;
  Title: string;
  Slug: string;
  url: string | null;
  hasDropdown: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  navbar_sublinks: NavbarSubLink[];
}
