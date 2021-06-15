export interface Book {
  id: string;
  volumeInfo: {
    title: string;
    subtitle?: string;
    authors: string[];
    description: string;
    averageRating: number;
    imageLinks: {
      smallThumbnail: string;
      thumbnail: string;
    };
    publisher: string;
    pageCount: number;
    language: string;
  };
}
