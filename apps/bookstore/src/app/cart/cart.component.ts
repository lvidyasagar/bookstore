import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookFacade } from '../shared/state/book.facade';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  cartBooks$ = this.facade.cartBooks$;

  constructor(private facade: BookFacade, private router: Router) {}

  removeBookFromCart(bookId: string): void {
    this.facade.removeCartBookById(bookId);
  }

  proceedToBuy(): void {
    this.router.navigateByUrl('/bill', {
      state: { removeCart: true },
    });
  }
}
