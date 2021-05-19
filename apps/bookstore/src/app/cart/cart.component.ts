import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ErrorDialogComponent } from '../shared/error-dialog/error-dialog.component';
import { Items } from '../shared/models/Books';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartBooks!: Items[];

  constructor(private apiService: ApiService, private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.getCartBooks();
  }

  getCartBooks(): void {
    this.cartBooks = this.apiService.getCartBooks();
    if (this.cartBooks.length === 0) {
      this.openDialog();
    }
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: '40%',
      height: '200px',
      data: { heading: 'Error', message: 'No Books were added into Cart or Cart is Empty', buttonText: 'Close' }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['search']);
    });
  }

  removeBookFromCart(bookIndex: number): void {
    this.apiService.removeCartItemonIndex(bookIndex);
    this.getCartBooks();
  }

  proceedToBuy(): void{
    this.router.navigateByUrl('/bill', {state: {books: this.cartBooks, removeCart: true}});
  }

}
