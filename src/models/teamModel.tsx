import { ImageData, Localization } from "./common";

export interface Team {
  id: number;
  documentId: string;
  Name: string;
  Role: string;
  locale: string;
  Image: ImageData;
  localizations: Localization[];
}
