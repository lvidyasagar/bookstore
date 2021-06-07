import { Bill } from '../models/Bill';
import { Items } from '../models/Books';

export interface BooksState {
  searchString: string;
  searchResults: Items[];
  recentSearches: string[];
  error: string;
  userandbill: Bill;
  cartBooks: Items[];
  bookcollection: Items[];
}

export const initialBooksState: BooksState = {
  searchString: '',
  searchResults: [],
  recentSearches: [],
  error: '',
  userandbill: {
    name: '',
    address: '',
    email: '',
    phone: 0,
  },
  cartBooks: [],
  bookcollection: [],
};
