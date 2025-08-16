import { ImageData, Localization } from "./common";

export interface Testimonial {
  id: number;
  documentId: string;
  Name: string;
  Role: string;
  Testimonial: string;
  locale: string;
  Image: ImageData;
  localizations: Localization[];
}
