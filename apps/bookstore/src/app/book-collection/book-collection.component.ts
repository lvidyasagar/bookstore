import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ErrorDialogComponent } from '../shared/error-dialog/error-dialog.component';
import { Items } from '../shared/models/Books';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-book-collection',
  templateUrl: './book-collection.component.html'
})
export class BookCollectionComponent implements OnInit {
  booksCollection!: Items[];

  constructor(private apiService: ApiService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.booksCollection = this.apiService.getMyBookCollection();
    if (this.booksCollection.length === 0){
      this.openDialog();
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: '40%',
      height: '200px',
      data: {heading: 'Error', message: 'No Books were purchased and added into collections. Proceed to Search Page', buttonText: 'OK'}
    });

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['search']);
    });
  }

}
