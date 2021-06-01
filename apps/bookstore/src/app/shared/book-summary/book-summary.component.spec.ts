import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { BookSummaryComponent } from './book-summary.component';
import { mockBooks } from '../models/Book-mock';
import { Items } from '../models/Books';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('BookSummaryComponent', () => {
  let component: BookSummaryComponent;
  let fixture: ComponentFixture<BookSummaryComponent>;
  let book: Items;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [BookSummaryComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSummaryComponent);
    component = fixture.componentInstance;
    book = mockBooks.items[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('trackByBookTitle function should return title of the volume', () => {
    expect(component.trackByBookTitle(0, book)).toBe('Pro Angular 6');
  });

  it('bookId should be same as book item that we clicked', () => {
    spyOn(component.bookEvent, 'emit');
    component.sendBookId(book);
    expect(component.bookEvent.emit).toHaveBeenCalledWith('XDNyDwAAQBAJ');
  });

  it('should match current book item index with cart added item index', fakeAsync(() => {
    spyOn(component.cartEvent, 'emit');
    component.sendCurrentBookToCart(book.id);
    expect(component.cartEvent.emit).toHaveBeenCalledWith(book.id);
  }));
});
