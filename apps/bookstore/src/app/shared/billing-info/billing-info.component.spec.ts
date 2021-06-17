import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { BookFacade } from '../state/book.facade';
import { provideMockStore } from '@ngrx/store/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { BillingInfoComponent } from './billing-info.component';
import { initialBooksState } from '../state/book.state';
import { mockBooks } from '@bookstore/data';
import { ReactiveFormsModule } from '@angular/forms';
import { BookCollectionComponent } from '../../book-collection/book-collection.component';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

const routes = [
  { path: 'bill', component: BillingInfoComponent },
  { path: 'book-collection', component: BookCollectionComponent}
];

describe('BillingInfoComponent', () => {
  let component: BillingInfoComponent;
  let fixture: ComponentFixture<BillingInfoComponent>;
  let facade: BookFacade;
  let router: Router;
  let location: Location;
  const initialState = initialBooksState;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        HttpClientTestingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule
      ],
      providers: [BookFacade, provideMockStore ({initialState})],
      declarations: [BillingInfoComponent, BookCollectionComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingInfoComponent);
    component = fixture.componentInstance;
    facade = TestBed.inject(BookFacade);
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit bill form if its valid and redirect to books collection page', () => {
    const state = {
      book: mockBooks.items[0].id,
      removeCart: false,
    };
    spyOn(facade, 'addUserAndBillDetails');
    spyOn(facade, 'addBookToCollection');
    spyOn(router , 'navigate');

    component.pendingPaymentBooks = { state };
    expect(component.BillForm.valid).toBeFalsy();
    component.BillForm.controls.name.setValue('Test');
    component.BillForm.controls.email.setValue('test@gmail.com');
    component.BillForm.controls.phone.setValue('9876543210');

    expect(component.BillForm.valid).toBeTruthy();
    component.submitBill();
    fixture.detectChanges();
    expect(facade.addUserAndBillDetails).toHaveBeenCalledWith(component.BillForm.value);
    expect(facade.addBookToCollection).toHaveBeenCalledWith(state.book);
    expect(router.navigate).toHaveBeenCalledWith(['/book-collection']);
  });

  it('submitting bill form redirect to books collection page, remove cart items and update cart count if any items in the cart', () => {
    const state = {
      removeCart: true,
    };
    component.pendingPaymentBooks = { state };
    component.BillForm.controls.name.setValue('Test');
    component.BillForm.controls.email.setValue('test@gmail.com');
    component.BillForm.controls.phone.setValue('9876543210');
    spyOn(facade, 'addBooksToCollectionFromCart');
    spyOn(facade, 'removeCartBooks');
    spyOn(router , 'navigate');
    expect(component.BillForm.valid).toBeTruthy();
    component.submitBill();
    expect(facade.addBooksToCollectionFromCart).toHaveBeenCalled();
    expect(facade.removeCartBooks).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/book-collection']);
  });

  it('should show alert if no books were added into cart when user directly opens bill page', () => {
    component.pendingPaymentBooks = {};
    spyOn(window, 'alert');
    component.submitBill();
    expect(window.alert).toHaveBeenCalledWith('No Books were added to cart');
  });
});
