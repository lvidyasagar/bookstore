import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Items } from '../models/Books';
import { ApiService } from '../services/api.service';
import { SharedModule } from '../shared.module';

import { BillingInfoComponent } from './billing-info.component';

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

const routes = [{ path: 'bill', component: BillingInfoComponent }];

describe('BillingInfoComponent', () => {
  let component: BillingInfoComponent;
  let fixture: ComponentFixture<BillingInfoComponent>;
  let apiService: ApiService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        HttpClientTestingModule,
        SharedModule,
        BrowserAnimationsModule,
      ],
      providers: [ApiService],
      declarations: [BillingInfoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingInfoComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit bill form if its valid and redirect to books collection page', () => {
    const state = {
      books: [book],
      removeCart: false,
    };
    component.pendingPaymentBooks = { state };
    expect(component.BillForm.valid).toBeFalsy();
    component.BillForm.controls.name.setValue('Test');
    component.BillForm.controls.email.setValue('test@gmail.com');
    component.BillForm.controls.phone.setValue('9876543210');

    expect(component.BillForm.valid).toBeTruthy();
    component.submitBill();

    expect(apiService.myBookCollectionsList.length).toBe(1);
  });

  it('submitting bill form redirect to books collection page, remove cart items and update cart count if any items in the cart', () => {
    const state = {
      books: [book],
      removeCart: true,
    };
    component.pendingPaymentBooks = { state };
    component.BillForm.controls.name.setValue('Test');
    component.BillForm.controls.email.setValue('test@gmail.com');
    component.BillForm.controls.phone.setValue('9876543210');

    expect(component.BillForm.valid).toBeTruthy();
    component.submitBill();

    expect(apiService.cartBooks).toEqual([]);
  });

  it('should show alert if no books were added into cart when user directly opens bill page', () => {
    component.pendingPaymentBooks = {};
    spyOn(window, 'alert');
    component.submitBill();
    expect(window.alert).toHaveBeenCalledWith('No Books were added to cart');
  });
});
