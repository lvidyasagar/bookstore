import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { ApiService } from '../services/api.service';
import { BookFacade } from './book.facade';
import { BookEffects } from './book.effects';
import { Observable, of, throwError } from 'rxjs';
import { mockBooks } from '../models/Book-mock';
import { mockBooksState } from '../mocks/mockState';
import * as BooksSelectors from './book.selector';
import { MemoizedSelector } from '@ngrx/store';
import { BooksState, initialBooksState } from './book.state';

describe('Book Effect', () => {
  let effect: BookEffects;
  let actions: Observable<any>;
  let service: ApiService;
  let mockStore: MockStore;
  let mockSearchStringSelector: MemoizedSelector<BooksState, any>;

  const initialState = initialBooksState;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ApiService,
        BookFacade,
        BookEffects,
        provideMockStore({ initialState }),
        provideMockActions(() => actions),
      ],
    });
  });

  beforeEach(() => {
    service = TestBed.inject(ApiService);
    mockStore = TestBed.inject(MockStore);
    mockSearchStringSelector = mockStore.overrideSelector(
      BooksSelectors.getSearchString,
      initialState.searchString
    );
    effect = TestBed.inject(BookEffects);
    actions = of({ type: '[Search] Load Search Results' });
  });

  it('should call api service and get desired results', () => {
    spyOn(service, 'getBooksBySearch').and.returnValue(of(mockBooks));
    mockSearchStringSelector.setResult(mockBooksState.searchString);
    mockStore.refreshState();
    effect.loadSearchResults$.subscribe((action) => {
      expect(action).toEqual({
        type: '[Search] Load Search Results Success',
        books: mockBooks.items,
      });
      expect(service.getBooksBySearch).toHaveBeenCalledWith('Angular');
    });
  });

  it('should call api service and get error if service down', () => {
    spyOn(service, 'getBooksBySearch').and.returnValue(throwError(true));
    mockSearchStringSelector.setResult(mockBooksState.searchString);
    mockStore.refreshState();
    effect.loadSearchResults$.subscribe((action) => {
      expect(action).toEqual({
        type: '[Search] Load Search Results Failure',
        error: true,
      });
    });
  });
});
