import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
export class SearchComponent implements OnInit {
  searchForm!: FormGroup;
  books!: Items[];
  subscription!: Subscription[];

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
    this.facade.searchString$.subscribe((value) => {
      if (this.searchString) {
        this.searchString.setValue(value);
      }
    });
    this.facade.error$.subscribe((error) => {
      if (error) {
        const msg = 'Server Error';
        this.openDialog(msg);
      }
    });
    this.facade.searchResults$.subscribe((books) => {
      const msg = 'No books found with Search Criteria';
      if (books && books.length > 0) {
        this.books = books;
      } else if (this.searchString && this.searchString.value) {
        this.openDialog(msg);
      }
    });
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
}
