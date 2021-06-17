import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { MemoizedSelector } from '@ngrx/store';
import { CartComponent } from './cart.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BookFacade } from '../shared/state/book.facade';
import { BooksState, initialBooksState } from '../shared/state/book.state';
import * as BooksSelectors from '../shared/state/book.selector';
import { mockBooks } from '@bookstore/data';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let facade: BookFacade;
  let mockStore: MockStore;
  let mockCartBooksSelector: MemoizedSelector<BooksState, any>;
  const mockRouter = {
    navigate: jasmine.createSpy('navigate'),
    navigateByUrl: jasmine.createSpy('navigateByUrl'),
  };

  const initialState = initialBooksState;
  let dialog: MatDialog;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        MatDialogModule,
      ],
      providers: [
        MatDialog,
        BookFacade,
        { provide: Router, useValue: mockRouter },
        provideMockStore({ initialState }),
      ],
      declarations: [CartComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    facade = TestBed.inject(BookFacade);
    dialog = TestBed.inject(MatDialog);
    mockStore = TestBed.inject(MockStore);
    mockCartBooksSelector = mockStore.overrideSelector(
      BooksSelectors.getCartBooks,
      mockBooks.items
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to book detail page when click on book', () => {
    const state = {
      removeCart: true,
    };
    component.proceedToBuy();
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/bill', { state });
  });

  it('removeBookFromCart method should call removeBookCart action to remove books from cart', () => {
    spyOn(facade, 'removeCartBookById');
    component.removeBookFromCart('XDNyDwAAQBAJ');
    expect(facade.removeCartBookById).toHaveBeenCalledWith('XDNyDwAAQBAJ');
  });

  it('should assign cartBooks$ when component is loaded', fakeAsync(() => {
    fixture.detectChanges();
    component.cartBooks$.subscribe((book) => {
      expect(book.length).toBe(1);
      expect(book[0].id).toBe('XDNyDwAAQBAJ');
    });
  }));
});
