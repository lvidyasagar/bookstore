import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { BookFacade } from '../state/book.facade';

@Component({
  selector: 'app-billing-info',
  templateUrl: './billing-info.component.html',
  styleUrls: ['./billing-info.component.scss'],
})
export class BillingInfoComponent implements OnInit {
  BillForm!: FormGroup;
  pendingPaymentBooks: NavigationExtras | undefined;

  constructor(private facade: BookFacade, private router: Router) {
    this.BillForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
      ]),
      address: new FormControl(''),
    });
    this.pendingPaymentBooks = this.router.getCurrentNavigation()?.extras;
  }

  ngOnInit(): void { }

  get name(): AbstractControl | null {
    return this.BillForm.get('name');
  }
  get email(): AbstractControl | null {
    return this.BillForm.get('email');
  }
  get phone(): AbstractControl | null {
    return this.BillForm.get('phone');
  }

  submitBill(): void {
    if (
      this.BillForm.valid &&
      this.pendingPaymentBooks &&
      this.pendingPaymentBooks.state
    ) {
      this.facade.addUserAndBillDetails(this.BillForm.value);
      if (this.pendingPaymentBooks.state.removeCart) {
        this.facade.addBooksToCollectionFromCart();
        this.facade.removeCartBooks();
      } else {
        this.facade.addBookToCollection(this.pendingPaymentBooks.state.book);
      }
      this.router.navigate(['/book-collection']);
    } else {
      alert('No Books were added to cart');
    }
  }
}
