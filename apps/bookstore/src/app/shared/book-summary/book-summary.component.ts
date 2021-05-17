import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { Items } from '../models/Books';

@Component({
  selector: 'app-book-summary',
  templateUrl: './book-summary.component.html',
  styleUrls: ['./book-summary.component.scss']
})
export class BookSummaryComponent implements OnInit {

  @Input() books!: Items[];
  @Input() isSingleColumn:boolean=false;
  @Input() isCart:boolean=false;
  @Output() bookEvent=new EventEmitter<string>();
  @Output() cartEvent=new EventEmitter<number>(); 

  constructor() { }

  ngOnInit(): void {
  }

  trackByBookTitle(index: number, book: Items): string {
    return book.volumeInfo.title;
  }


  sendBookId(book:Items){
    this.bookEvent.emit(book.id);
  }

  sendCurrentBookToCart(currentBookIndex:number){
    this.cartEvent.emit(currentBookIndex);
  }


}
