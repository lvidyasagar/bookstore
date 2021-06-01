import { mockBooks } from '../models/Book-mock';
import { initialBooksState } from './book.state';
import * as BooksSelectors from './book.selector';
import { mockBooksState } from '../mocks/mockState';

describe('Book Selectors', () => {
  const initialState = mockBooksState;

  it('should select the search string ', () => {
    const result = BooksSelectors.getSearchString.projector(initialState);
    expect(result).toBe('Angular');
  });

  it('should select the error ', () => {
    const result = BooksSelectors.getError.projector(initialState);
    expect(result).toBe(false);
  });
  it('should select the search books ', () => {
    const result = BooksSelectors.getSearchResults.projector(initialState);
    expect(result.length).toBe(1);
    expect(result[0].id).toBe('XDNyDwAAQBAJ');
  });

  it('should select the cart books ', () => {
    const result = BooksSelectors.getCartBooks.projector(initialState);
    expect(result.length).toBe(1);
    expect(result[0].id).toBe('XDNyDwAAQBAJ');
  });

  it('should select the books collection ', () => {
    const result = BooksSelectors.getBooksCollection.projector(initialState);
    expect(result[0].id).toBe('XDNyDwAAQBAJ');
  });

});
