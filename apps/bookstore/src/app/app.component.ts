import { Component, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { BookFacade } from './shared/state/book.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'enlight';
  routes = [
    { name: 'Search', path: '/search', icon: 'search' },
    { name: 'Cart', path: '/cart', icon: 'shopping_cart' },
    { name: 'My Collections', path: '/book-collection', icon: 'dns' },
  ];
  cartLength = 0;

  constructor(
    public mediaObserver: MediaObserver,
    private facade: BookFacade
  ) {}

  ngOnInit(): void {
    this.facade.cartBooks$.subscribe(
      (cartItems) => (this.cartLength = cartItems.length)
    );
  }
}
