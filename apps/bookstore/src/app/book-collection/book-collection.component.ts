import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { ErrorDialogComponent } from '../shared/error-dialog/error-dialog.component';
import { Items } from '@bookstore/data';
import { BookFacade } from '../shared/state/book.facade';

@Component({
  selector: 'app-book-collection',
  templateUrl: './book-collection.component.html',
})
export class BookCollectionComponent implements OnInit, OnDestroy {
  booksCollection!: Items[];
  subscription!: Subscription;
  constructor(
    private facade: BookFacade,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.subscription = this.facade.booksCollection$
      .pipe(distinctUntilChanged())
      .subscribe((books) => {
        if (books.length === 0) {
          this.openDialog();
        }
        this.booksCollection = books;
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: '40%',
      height: '200px',
      data: {
        heading: 'Error',
        message:
          'No Books were purchased and added into collections. Proceed to Search Page',
        buttonText: 'OK',
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['search']);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
