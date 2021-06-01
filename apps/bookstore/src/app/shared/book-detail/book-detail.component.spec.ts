import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Location } from '@angular/common';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BillingInfoComponent } from '../billing-info/billing-info.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { BookDetailComponent } from './book-detail.component';
import { BookFacade } from '../state/book.facade';
import { mockBooksState } from '../mocks/mockState';
import { MemoizedSelectorWithProps } from '@ngrx/store';
import { BooksState } from '../state/book.state';
import * as BooksSelectors from '../state/book.selector';
import { Items } from '../models/Books';
import { ActivatedRoute } from '@angular/router';
import { AuthorPipe } from '../pipes/author.pipe';
import { DescriptionPipe } from '../pipes/description.pipe';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

const routes = [{ path: 'bill', component: BillingInfoComponent }];

describe('BookDetailComponent', () => {
  let component: BookDetailComponent;
  let fixture: ComponentFixture<BookDetailComponent>;
  let facade: BookFacade;
  let router: Router;
  let mockStore: MockStore;
  let mockBookByIdSelector: MemoizedSelectorWithProps<BooksState, any, any>;
  // tslint:disable-next-line: prefer-const
  let location: Location;

  const initialState = mockBooksState;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        HttpClientTestingModule,
        MatButtonModule
      ],
      providers: [
        BookFacade,
        provideMockStore({ initialState }),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {
                id: 'XDNyDwAAQBAJ',
              },
            },
          },
        },
      ],
      declarations: [BookDetailComponent, AuthorPipe, DescriptionPipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDetailComponent);
    component = fixture.componentInstance;
    facade = TestBed.inject(BookFacade);
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    mockStore = TestBed.inject(MockStore);
    mockBookByIdSelector = mockStore.overrideSelector(
      BooksSelectors.getSearchResults,
      initialState.searchResults
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('On Load of component should get book details from state', () => {
    fixture.detectChanges();
    expect(component.book.id).toBe('XDNyDwAAQBAJ');
  });

  it('should return star icon name based on average ratings of book', () => {
    fixture.detectChanges();
    expect(component.showIcon(0)).toBe('star');
    expect(component.showIcon(1)).toBe('star_half');
    expect(component.showIcon(2)).toBe('star_border');
  });

  it('should redirect to bill page when click on Buy Now button', fakeAsync(() => {
    fixture.detectChanges();
    const state = {
      book: component.book.id,
      removeCart: false,
    };
    component.buyNow();
    router.navigateByUrl('/bill', { state }).then(() => {
      expect(location.path()).toBe('/bill');
    });
  }));

  it('on click of add to cart button should call add to cart action of facade', () => {
    spyOn(facade, 'addBooksToCart');
    fixture.detectChanges();
    component.addToCart();
    expect(facade.addBooksToCart).toHaveBeenCalledWith(component.book);
    expect(component.cartFlag).toBe(true);
  });
});
