import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiService } from '../shared/services/api.service';
import { SharedModule } from '../shared/shared.module';

import { CartComponent } from './cart.component';
import { mockBooks } from '../shared/models/Book-mock';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../shared/error-dialog/error-dialog.component';
import { of } from 'rxjs';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let apiService: ApiService;
  const mockRouter = {
    navigate: jasmine.createSpy('navigate'),
    navigateByUrl: jasmine.createSpy('navigateByUrl'),
  };
  let dialog: MatDialog;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        SharedModule,
        BrowserAnimationsModule,
      ],
      providers: [
        ApiService,
        MatDialog,
        { provide: Router, useValue: mockRouter }
      ],
      declarations: [CartComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    dialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to book detail page when click on book', () => {
    const state = {
      books: mockBooks.items,
      removeCart: true
    };
    component.cartBooks = mockBooks.items;
    component.proceedToBuy();
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/bill', {state});
  });

  it('removeBookFromCart method should call removeCartItemonIndex apiservice method', () => {
    spyOn(apiService, 'removeCartItemonIndex');
    spyOn(apiService, 'getCartBooks').and.returnValue(mockBooks.items);
    component.removeBookFromCart(1);
    expect(apiService.removeCartItemonIndex).toHaveBeenCalledOnceWith(1);
    expect(apiService.getCartBooks).toHaveBeenCalled();
  });

  it('should open popup if cart is empty and return to search page', () => {
    spyOn(dialog, 'open')
     .and
     .returnValue(
      {afterClosed: () => of(true)} as MatDialogRef<ErrorDialogComponent, any>
     );
    component.openDialog();
    fixture.detectChanges();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['search']);
  });

});
