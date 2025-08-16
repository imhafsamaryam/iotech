export interface ImageFormat {
  url: string;
  name: string;
  width: number;
  height: number;
}

export interface ImageData {
  id: number;
  documentId: string;
  name: string;
  ext: string;
  alternativeText: string | null;
  width: number;
  height: number;
  formats: {
    small?: ImageFormat;
    thumbnail?: ImageFormat;
    [key: string]: ImageFormat | undefined;
  };
  url: string;
}

export interface Localization {
  id: number;
  documentId: string;
  Name: string;
  Role: string;
  locale: string;
}
