import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { BookFacade } from './book.facade';
import { initialBooksState } from './book.state';
import * as BookActions from './book.action';
import { mockBooks } from '../models/Book-mock';
describe('Books Facade', () => {
  let mockStore: MockStore;
  let facade: BookFacade;

  const initialState = initialBooksState;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      providers: [BookFacade, provideMockStore({ initialState })],
    }).compileComponents();
  });

  beforeEach(async () => {
    mockStore = TestBed.inject(MockStore);
    facade = TestBed.inject(BookFacade);
  });

  it('should be created', () => {
    expect(facade).toBeTruthy();
  });

  it('should call and execute setSearchString method in facade', () => {
    const searchString = 'Angular';
    const expectedAction = BookActions.setSearchString({
      payload: searchString,
    });
    spyOn(facade, 'setSearchString').and.callThrough();
    spyOn(mockStore, 'dispatch').and.callThrough();

    facade.setSearchString(searchString);
    expect(facade.setSearchString).toHaveBeenCalledWith('Angular');
    expect(mockStore.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('should call and execute dispatchSearchResults method in facade', () => {
    const expectedAction = BookActions.loadSearchResults();
    spyOn(mockStore, 'dispatch').and.callThrough();
    facade.dispatchSearchResults();
    expect(mockStore.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('should call and execute addRecentSearches method in facade', () => {
    const searchString = 'Angular';
    const expectedAction = BookActions.addRecentSearches({ searchString });
    spyOn(facade, 'addRecentSearches').and.callThrough();
    spyOn(mockStore, 'dispatch').and.callThrough();

    facade.addRecentSearches(searchString);
    expect(facade.addRecentSearches).toHaveBeenCalledWith('Angular');
    expect(mockStore.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('should call and execute addBooksToCart method in facade', () => {
    const book = mockBooks.items[0];
    const expectedAction = BookActions.addBooksToCart({ payload: book });
    spyOn(facade, 'addBooksToCart').and.callThrough();
    spyOn(mockStore, 'dispatch').and.callThrough();

    facade.addBooksToCart(book);
    expect(facade.addBooksToCart).toHaveBeenCalledWith(book);
    expect(mockStore.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('should call and execute removeCartBookById method in facade', () => {
    const bookId = mockBooks.items[0].id;
    const expectedAction = BookActions.removeCartBookById({ payload: bookId });
    spyOn(facade, 'removeCartBookById').and.callThrough();
    spyOn(mockStore, 'dispatch').and.callThrough();

    facade.removeCartBookById(bookId);
    expect(facade.removeCartBookById).toHaveBeenCalledWith('XDNyDwAAQBAJ');
    expect(mockStore.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('should call and execute removeCartBooks method in facade', () => {
    const expectedAction = BookActions.removeCartBooks();
    spyOn(mockStore, 'dispatch').and.callThrough();
    facade.removeCartBooks();
    expect(mockStore.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('should call and execute addBooksToCollectionFromCart method in facade', () => {
    const expectedAction = BookActions.addBooksToCollection();
    spyOn(mockStore, 'dispatch').and.callThrough();
    facade.addBooksToCollectionFromCart();
    expect(mockStore.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('should call and execute addBookToCollection method in facade', () => {
    const bookId = mockBooks.items[0].id;
    const expectedAction = BookActions.addBookToCollection({ payload: bookId });
    spyOn(facade, 'addBookToCollection').and.callThrough();
    spyOn(mockStore, 'dispatch').and.callThrough();

    facade.addBookToCollection(bookId);
    expect(facade.addBookToCollection).toHaveBeenCalledWith('XDNyDwAAQBAJ');
    expect(mockStore.dispatch).toHaveBeenCalledWith(expectedAction);
  });
});
