import { Books } from './Books';

export const mockBooks: Books = {
    kind: 'books#volumes',
    totalitems: 1283,
    items: [
      {
        id: 'XDNyDwAAQBAJ',
        volumeInfo: {
          title: 'Pro Angular 6',
          authors: [
            'Adam Freeman'
          ],
          averageRating: 2.5,
          publisher: 'Apress',
          description: 'Best-selling author Adam Freeman shows you how to use Angular in your projects, starting from the nuts and bolts and building up to the most advanced and sophisticated features, going in-depth to give you the knowledge you need. Chapters include common problems and how to avoid them. Additionally, this book now has accompanying online files for Angular 7; all examples in the book work without changes in Angular 7. Get the most from Angular, the leading framework for building dynamic JavaScript applications. Understand the MVC pattern and the benefits it can offer. What You’ll Learn Gain a solid architectural understanding of the MVC Pattern Create rich and dynamic web app clients using Angular Use the ng tools to create and build an Angular project Extend and customize Angular Test your Angular projects What\'s New in This Edition Revised for the features and changes in Angular 6 and 7 Covers @angular/cli, ng command line tools, and WebPack Includes HttpClient for simplified asynchronous HTTP requests Presents updates to pipes and localized text display Who This Book Is For Web developers with a foundation knowledge of HTML and JavaScript who want to create rich client-side applications',
          pageCount: 776,
          imageLinks: {
            smallThumbnail: 'http://books.google.com/books/content?id=XDNyDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
            thumbnail: 'http://books.google.com/books/content?id=XDNyDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
          },
          language: 'en',
        },
      },
     ]
  };
