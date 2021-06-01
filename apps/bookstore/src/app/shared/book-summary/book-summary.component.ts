import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Items } from '../models/Books';

@Component({
  selector: 'app-book-summary',
  templateUrl: './book-summary.component.html',
  styleUrls: ['./book-summary.component.scss'],
})
export class BookSummaryComponent implements OnInit {
  @Input() books!: Items[];
  @Input() isSingleColumn = false;
  @Input() isCart = false;
  @Input() isCollection = false;
  @Output() bookEvent = new EventEmitter<string>();
  @Output() cartEvent = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  trackByBookTitle(index: number, book: Items): string {
    return book.volumeInfo.title;
  }

  sendBookId(book: Items): void {
    this.bookEvent.emit(book.id);
  }

  sendCurrentBookToCart(currentBookId: string): void {
    this.cartEvent.emit(currentBookId);
  }
}
