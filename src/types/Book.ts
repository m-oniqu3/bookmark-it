type SearchInfo = {
  textSnippet: string;
};

type ImageLinks = {
  smallThumbnail: string;
};

export type Book = {
  id: string;
  title: string;
  authors?: string[];
  categories: string[] | undefined;
  description: string | undefined;
  imageLinks: ImageLinks | undefined;
  searchInfo: SearchInfo | undefined;
  subtitle?: string | undefined;
  publishedDate: string;
  averageRating: number;
  ratingsCount: number;
};

export interface ExploreBooks extends Book {
  subject: string[];
}

export type BookCategory = "Reading" | "TBR" | "DNF" | "Finished";
