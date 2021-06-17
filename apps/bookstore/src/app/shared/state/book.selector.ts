import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Items } from '@bookstore/data';
import { BooksState } from './book.state';

export const SharedSelector = createFeatureSelector<BooksState>('app');

export const getSearchString = createSelector(
  SharedSelector,
  (state) => state.searchString
);

export const getError = createSelector(SharedSelector, (state) => state.error);

export const getSearchResults = createSelector(
  SharedSelector,
  (state) => state.searchResults
);

export const getBookDetailsById = (props: { id: string }) =>
  createSelector(getSearchResults, (state): Items | undefined => {
    return state.find((book: Items) => book.id === props.id);
  });

export const getCartBooks = createSelector(
  SharedSelector,
  (state) => state.cartBooks
);

export const getBooksCollection = createSelector(
  SharedSelector,
  (state) => state.bookcollection
);
