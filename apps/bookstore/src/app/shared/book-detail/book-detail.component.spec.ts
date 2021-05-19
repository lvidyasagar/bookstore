import { HttpClientTestingModule } from '@angular/common/http/testing';
import {Location} from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { BillingInfoComponent } from '../billing-info/billing-info.component';
import { Items } from '../models/Books';
import { ApiService } from '../services/api.service';

import { BookDetailComponent } from './book-detail.component';

const routes = [
  { path: 'bill', component: BillingInfoComponent }
];

const book: Items = {
  id: '123',
  volumeInfo: {
    title: 'Test',
    authors: ['test1'],
    averageRating: 2.5,
    description: 'Sample',
    imageLinks: { smallThumbnail: '', thumbnail: '' },
    language: 'en',
    pageCount: 12,
    publisher: 'Test',
    subtitle: 'Test12',
  },
};


describe('BookDetailComponent', () => {
  let component: BookDetailComponent;
  let fixture: ComponentFixture<BookDetailComponent>;
  let apiService: ApiService;
  let router: Router;
  // tslint:disable-next-line: prefer-const
  let location: Location;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        HttpClientTestingModule
      ],
      providers: [ApiService],
      declarations: [ BookDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDetailComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call Bookid API to get book in detail information', () => {
    spyOn(apiService, 'getCurrentBookById').and.returnValue(of(book));
    component.ngOnInit();
    expect(apiService.getCurrentBookById).toHaveBeenCalled();
  });

  it('should return star icon name based on average ratings of book', () => {
    component.book = book;
    expect(component.showIcon(0)).toBe('star');
    expect(component.showIcon(1)).toBe('star_half');
    expect(component.showIcon(2)).toBe('star_border');
  });


  it('should redirect to bill page when click on Buy Now button', () => {
    component.book = book;
    const state = {
      books: [book],
      removeCart: false
    };
    component.buyNow();
    router.navigateByUrl('/bill', {state}).then(() => {
      expect(location.path()).toBe('/bill');
    });
  });

  it('should add current book to cart when click on add to cart button ', () => {
    spyOn(apiService, 'updateCartCount');
    component.addToCart();

    expect(component.cartFlag).toBeTruthy();
    expect(apiService.cartBooks.length).toBe(1);
    expect(apiService.updateCartCount).toHaveBeenCalled();
  });

});
