import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Items, Bill } from '@bookstore/data';
import * as BooksSelectors from './book.selector';
import * as BooksActions from './book.action';
import { BooksState } from './book.state';

@Injectable()
export class BookFacade {
  constructor(private store: Store<BooksState>) {}

  searchString$ = this.store.select(BooksSelectors.getSearchString);
  error$ = this.store.select(BooksSelectors.getError);
  searchResults$ = this.store.select(BooksSelectors.getSearchResults);
  cartBooks$ = this.store.select(BooksSelectors.getCartBooks);
  booksCollection$ = this.store.select(BooksSelectors.getBooksCollection);

  setSearchString(searchString: string): void {
    this.store.dispatch(
      BooksActions.setSearchString({ payload: searchString })
    );
  }

  dispatchSearchResults(): void {
    return this.store.dispatch(BooksActions.loadSearchResults());
  }

  addRecentSearches(searchString: string): void {
    this.store.dispatch(BooksActions.addRecentSearches({ searchString }));
  }

  getBookDetailsById(bookId: string): Observable<Items | undefined> {
    return this.store.select(BooksSelectors.getBookDetailsById({ id: bookId }));
  }

  addBooksToCart(book: Items): void {
    this.store.dispatch(BooksActions.addBooksToCart({ payload: book }));
  }

  removeCartBookById(bookId: string): void {
    this.store.dispatch(BooksActions.removeCartBookById({ payload: bookId }));
  }

  removeCartBooks(): void {
    this.store.dispatch(BooksActions.removeCartBooks());
  }

  addUserAndBillDetails(userAndBillDetails: Bill): void {
    this.store.dispatch(
      BooksActions.saveUserDetails({ payload: userAndBillDetails })
    );
  }

  addBooksToCollectionFromCart(): void {
    this.store.dispatch(BooksActions.addBooksToCollection());
  }

  addBookToCollection(bookId: string): void {
    this.store.dispatch(BooksActions.addBookToCollection({ payload: bookId }));
  }
}
