import { mockBooks } from '../models/Book-mock';

export const mockBooksState = {
  searchString: 'Angular',
  searchResults: mockBooks.items,
  recentSearches: ['Angular'],
  error: '',
  userandbill: {
    name: '',
    address: '',
    email: '',
    phone: 0,
  },
  cartBooks: [mockBooks.items[0]],
  bookcollection: [mockBooks.items[0]],
};
