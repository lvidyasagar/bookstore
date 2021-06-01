import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { BookFacade } from './shared/state/book.facade';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { BooksState, initialBooksState } from './shared/state/book.state';
import { MemoizedSelector } from '@ngrx/store';
import * as BooksSelectors from './shared/state/book.selector';
import { mockBooks } from './shared/models/Book-mock';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let facade: BookFacade;
  let mockStore: MockStore;
  let mockCartBooksSelector: MemoizedSelector<BooksState, any>;

  const initialState = initialBooksState;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [BookFacade, provideMockStore({initialState})]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    facade = TestBed.inject(BookFacade);
    mockStore = TestBed.inject(MockStore);
    mockCartBooksSelector = mockStore.overrideSelector(
      BooksSelectors.getCartBooks,
      initialBooksState.cartBooks
    );
    fixture.detectChanges();
  });

  it('should create the app', () => {
     expect(component).toBeTruthy();
  });

  it(`should have as title 'enlight'`, () => {
     expect(component.title).toEqual('enlight');
  });

  it('should cart length is zero on application load ', () => {
     fixture.detectChanges();
     expect(component.cartLength).toEqual(0);
  });

});
