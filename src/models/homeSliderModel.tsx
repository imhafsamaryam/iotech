import { ImageData, Localization } from "./common";

export interface HomeSlider {
  id: number;
  documentId: string;
  Title: string;
  Description: string;
  link: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  Media: ImageData;
  Image: ImageData;
  localizations: Localization[];
}
