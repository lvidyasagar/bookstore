import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { distinctUntilChanged } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorDialogComponent } from '../shared/error-dialog/error-dialog.component';
import { Items } from '../shared/models/Books';
import { BookFacade } from '../shared/state/book.facade';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  searchForm!: FormGroup;
  books!: Items[];
  subscription: Subscription[] = [];

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private facade: BookFacade
  ) {
    this.searchForm = new FormGroup({
      searchString: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    const subscription1 = this.facade.searchString$.subscribe((value) => {
      if (this.searchString) {
        this.searchString.setValue(value);
      }
    });
    const subscription2 = this.facade.error$.subscribe((error) => {
        if (error) {
          this.openDialog(error);
        }
      });
    const subscription3 = this.facade.searchResults$.subscribe((books) => {
      if (books && books.length > 0) {
        this.books = books;
      } else {
        this.books = [];
      }
    });

    this.subscription.push(subscription1, subscription2, subscription3);
  }

  get searchString(): AbstractControl | null {
    return this.searchForm.get('searchString');
  }

  searchBooks(): void {
    if (this.searchString) {
      this.facade.setSearchString(this.searchString.value);
      this.facade.dispatchSearchResults();
      this.facade.addRecentSearches(this.searchString.value);
    }
  }

  redirectToBookDetail(bookId: string): void {
    this.router.navigate(['book-detail', bookId]);
  }

  openDialog(message: string): void {
    this.dialog.open(ErrorDialogComponent, {
      width: '40%',
      height: '200px',
      data: {
        heading: 'Something went wrong ',
        message,
        buttonText: 'Close',
      },
    });
  }

  ngOnDestroy(): void {
    if (this.subscription.length > 0) {
      this.subscription.forEach((sub) => {
        sub.unsubscribe();
      });
    }
  }
}
