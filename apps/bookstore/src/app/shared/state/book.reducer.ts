import { createReducer, on } from '@ngrx/store';
import { initialBooksState, BooksState } from './book.state';
import * as BooksActions from './book.action';

export const sharedReducer = createReducer(
  initialBooksState,
  on(
    BooksActions.setSearchString,
    (state, action): BooksState => {
      return {
        ...state,
        searchString: action.payload,
      };
    }
  ),
  on(
    BooksActions.loadSearchResultsSuccess,
    (state, action): BooksState => {
      return {
        ...state,
        searchResults:
          action.books && action.books.length > 0 ? action.books : [],
        error: ''
      };
    }
  ),
  on(
    BooksActions.loadSearchResultsFailure,
    (state): BooksState => {
      return {
        ...state,
        searchResults: [],
        error: 'No books found with Search Criteria or Server Error',
      };
    }
  ),
  on(
    BooksActions.addRecentSearches,
    (state, action): BooksState => {
      return {
        ...state,
        recentSearches: state.recentSearches.includes(action.searchString)
          ? state.recentSearches
          : [...state.recentSearches, action.searchString],
      };
    }
  ),
  on(
    BooksActions.addBooksToCart,
    (state, action): BooksState => {
      return {
        ...state,
        cartBooks: [...state.cartBooks, action.payload],
      };
    }
  ),
  on(BooksActions.removeCartBookById, (state, action) => {
    return {
      ...state,
      cartBooks: state.cartBooks.filter((book) => book.id !== action.payload),
    };
  }),
  on(BooksActions.removeCartBooks, (state) => {
    return {
      ...state,
      cartBooks: [],
    };
  }),
  on(
    BooksActions.saveUserDetails,
    (state, action): BooksState => {
      return {
        ...state,
        userandbill: action.payload,
      };
    }
  ),
  on(
    BooksActions.addBooksToCollection,
    (state): BooksState => {
      return {
        ...state,
        bookcollection: state.bookcollection.concat(state.cartBooks.map((book) => {
          return {
            id: book.id,
            volumeInfo: book.volumeInfo,
            userandbilldetails: state.userandbill,
          };
        })),
      };
    }
  ),
  on(
    BooksActions.addBookToCollection,
    (state, action): BooksState => {
      const book = state.searchResults.find((item) => item.id === action.payload);
      return {
        ...state,
        bookcollection:
          book && book.id && book.volumeInfo
            ? state.bookcollection.concat({
                id: book.id,
                volumeInfo: book.volumeInfo,
                userandbilldetails: state.userandbill,
              })
            : state.bookcollection,
      };
    }
  )
);
