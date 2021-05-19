import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Books, Items } from '../models/Books';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  cartSubject: Subject<number> = new Subject();
  currentSearchBooks!: Items[];
  cartBooks: Items[] = [];
  myBookCollectionsList: Items[] = [];

  constructor(private http: HttpClient) {}

  getCurrentBookById(id: string): Observable<Items> {
    return this.http.get<Items>(environment.getBookByIdGoogleBooksApi + id);
  }
  getBooksBySearch(searchString: string): Observable<Books> {
    return this.http.get<Books>(environment.googleApiUrl + searchString);
  }

  setCartBooks(book: Items): void {
    this.cartBooks.push(book);
  }

  getCartBooks(): Items[] {
    return this.cartBooks;
  }

  removeCartItemonIndex(bookIndex: number): void {
    this.cartBooks.splice(bookIndex, 1);
    this.updateCartCount();
  }

  updateCartCount(): void {
    this.cartSubject.next(this.cartBooks.length);
  }

  saveToMyBookCollections(book: Items[]): void {
    book.map((currentBook) => {
      this.myBookCollectionsList.push(currentBook);
    });
  }

  getMyBookCollection(): Items[] {
    return this.myBookCollectionsList;
  }
}
