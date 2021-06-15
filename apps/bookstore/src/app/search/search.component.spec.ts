import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchComponent } from './search.component';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BookFacade } from '../shared/state/book.facade';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { MemoizedSelector } from '@ngrx/store';
import { BooksState, initialBooksState } from '../shared/state/book.state';
import { mockBooksState } from '../shared/mocks/mockState';
import * as BooksSelectors from '../shared/state/book.selector';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InteractivityChecker } from '@angular/cdk/a11y';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let facade: BookFacade;
  let dialog: MatDialog;
  const mockRouter = {
    navigate: jasmine.createSpy('navigate'),
  };
  let mockStore: MockStore;
  let mockBooksSelector: MemoizedSelector<BooksState, any>;
  let mockSearchStringSelector: MemoizedSelector<BooksState, any>;
  let mockerrorSelector: MemoizedSelector<BooksState, any>;

  const initialState = initialBooksState;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatDialogModule,
      ],
      providers: [
        BookFacade,
        MatDialog,
        { provide: Router, useValue: mockRouter },
        provideMockStore({
          initialState,
        }),
      ],
      declarations: [SearchComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .overrideProvider(InteractivityChecker, {
        useValue: {
          isFocusable: () => true,
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    facade = TestBed.inject(BookFacade);
    dialog = TestBed.inject(MatDialog);
    mockStore = TestBed.inject(MockStore);
    mockBooksSelector = mockStore.overrideSelector(
      BooksSelectors.getSearchResults,
      initialState.searchResults
    );
    mockSearchStringSelector = mockStore.overrideSelector(
      BooksSelectors.getSearchString,
      initialState.searchString
    );
    mockerrorSelector = mockStore.overrideSelector(
      BooksSelectors.getError,
      initialState.error
    );
    fixture.detectChanges();
  });

  afterEach(() => {
    dialog.closeAll();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('On load of component should get initial state from store', () => {
    fixture.detectChanges();
    expect(component.books.length).toBe(0);
    expect(component.searchForm.controls.searchString.value).toBe('');
    facade.error$.subscribe((err) => {
      expect(err).toBe('');
    });
  });

  it('should update state data from store whenever state updates', () => {
    mockBooksSelector.setResult(mockBooksState.searchResults);
    mockSearchStringSelector.setResult(mockBooksState.searchString);
    mockStore.refreshState();
    fixture.detectChanges();
    expect(component.books.length).toBe(1);
    expect(component.searchForm.controls.searchString.value).toBe('Angular');
    facade.error$.subscribe((err) => {
      expect(err).toBe('');
    });
  });

  it('should show error pop when google api is down', () => {
    spyOn(dialog, 'open');
    mockerrorSelector.setResult('No books found with Search Criteria or Server Error');
    mockStore.refreshState();
    component.ngOnInit();
    expect(dialog.open).toHaveBeenCalled();
  });

  it('submmiting search form should call search related actions', () => {
    spyOn(facade, 'setSearchString');
    spyOn(facade, 'dispatchSearchResults');
    spyOn(facade, 'addRecentSearches');

    component.searchForm.controls.searchString.setValue('Angular');
    component.searchBooks();
    fixture.detectChanges();
    expect(component.searchForm.valid).toBeTruthy();
    expect(facade.setSearchString).toHaveBeenCalledWith('Angular');
    expect(facade.dispatchSearchResults).toHaveBeenCalled();
    expect(facade.addRecentSearches).toHaveBeenCalledWith('Angular');
  });

  it('should redirect to book detail page when click on book', () => {
    component.redirectToBookDetail('XDNyDwAAQBAJ');
    expect(mockRouter.navigate).toHaveBeenCalledWith([
      'book-detail',
      'XDNyDwAAQBAJ',
    ]);
  });
});
