import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Items } from '../../shared/models/Books';
import { BookFacade } from '../state/book.facade';
@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent implements OnInit {
  starCount = 5;
  ratingArr: number[] = [];
  subscription!: Subscription;
  book!: Items;
  cartFlag = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private facade: BookFacade
  ) {}

  ngOnInit(): void {
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
    this.facade
      .getBookDetailsById(this.route.snapshot.params.id)
      .subscribe((book) => {
        if (book) {
          this.book = book;
        }
      });
  }

  showIcon(index: number): string {
    if (
      this.isFloat(this.book?.volumeInfo.averageRating) &&
      Math.floor(this.book?.volumeInfo.averageRating) === index + 1
    ) {
      return 'star_half';
    } else if (this.book?.volumeInfo.averageRating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  isFloat(value: number): boolean {
    return Number(value) === value && value % 1 !== 0;
  }

  addToCart(): void {
    this.facade.addBooksToCart(this.book);
    this.cartFlag = true;
  }

  buyNow(): void {
    this.router.navigateByUrl('/bill', {
      state: { book: this.book.id, removeCart: false },
    });
  }

}
