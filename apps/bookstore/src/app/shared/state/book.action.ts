import { createAction, props } from '@ngrx/store';
import { Bill } from '../models/Bill';
import { Items } from '../models/Books';

export const setSearchString = createAction(
  '[Search] Set Search String',
  props<{ payload: string }>()
);
export const loadSearchResults = createAction('[Search] Load Search Results');
export const loadSearchResultsSuccess = createAction(
  '[Search] Load Search Results Success',
  props<{ books: Items[] }>()
);
export const loadSearchResultsFailure = createAction(
  '[Search] Load Search Results Failure',
  props<{ error: boolean }>()
);
export const addRecentSearches = createAction(
  '[Search] Add Recent Search',
  props<{ searchString: string }>()
);
export const saveUserDetails = createAction(
  '[Bill Component] Save User and Bill Details',
  props<{ payload: Bill }>()
);
export const addBooksToCart = createAction(
  '[Cart] Add Books to Cart',
  props<{ payload: Items }>()
);
export const removeCartBookById = createAction(
  '[Cart] Remove Book By Id',
  props<{ payload: string }>()
);
export const removeCartBooks = createAction('[Cart] Remove Cart Books');
export const addBooksToCollection = createAction(
  '[Book Collection] Add Books to My Collection from Cart'
);
export const addBookToCollection = createAction(
  '[Book Collection] Add Book to Collection from Buynow',
  props<{ payload: string }>()
);
