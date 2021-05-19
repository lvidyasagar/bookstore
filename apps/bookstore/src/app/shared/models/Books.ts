export interface Books{
    kind: string;
    totalitems: number;
    items: Items[];
}

export interface Items{
    id: string;
    volumeInfo: Book;
}

export interface Book{
    title: string;
    subtitle?: string;
    authors: string[];
    description: string;
    averageRating: number;
    imageLinks: {
        smallThumbnail: string,
        thumbnail: string
    };
    publisher: string;
    pageCount: number;
    language: string;
}
