import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ErrorDialogComponent } from '../shared/error-dialog/error-dialog.component';
import { BookFacade } from '../shared/state/book.facade';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { MemoizedSelector } from '@ngrx/store';
import * as BooksSelectors from '../shared/state/book.selector';
import { BookCollectionComponent } from './book-collection.component';
import { BooksState, initialBooksState } from '../shared/state/book.state';
import { mockBooksState } from '../shared/mocks/mockState';
import { mockBooks } from '../shared/models/Book-mock';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('BookCollectionComponent', () => {
  let component: BookCollectionComponent;
  let fixture: ComponentFixture<BookCollectionComponent>;
  let facade: BookFacade;
  let dialog: MatDialog;
  let mockStore: MockStore;
  let mockBooksCollectionSelector: MemoizedSelector<BooksState, any>;
  const mockRouter = {
    navigate: jasmine.createSpy('navigate'),
  };

  const initialState = initialBooksState;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        MatDialogModule,
      ],
      providers: [
        BookFacade,
        MatDialog,
        { provide: Router, useValue: mockRouter },
        provideMockStore({ initialState }),
      ],
      declarations: [BookCollectionComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookCollectionComponent);
    component = fixture.componentInstance;
    facade = TestBed.inject(BookFacade);
    dialog = TestBed.inject(MatDialog);
    mockStore = TestBed.inject(MockStore);
    mockBooksCollectionSelector = mockStore.overrideSelector(
      BooksSelectors.getBooksCollection,
      mockBooksState.bookcollection
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open pop if books collection is empty', () => {
    spyOn(component, 'openDialog').and.callThrough();
    spyOn(dialog, 'open').and.callThrough();
    mockBooksCollectionSelector.setResult([]);
    mockStore.refreshState();
    fixture.detectChanges();
    dialog.closeAll();
    expect(component.booksCollection.length).toBe(0);
    expect(component.openDialog).toHaveBeenCalled();
    expect(dialog.open).toHaveBeenCalled();
  });
  it('should open popup if book collection is empty and return to search page', () => {
    spyOn(dialog, 'open').and.returnValue({
      afterClosed: () => of(true),
    } as MatDialogRef<ErrorDialogComponent, any>);
    component.openDialog();
    fixture.detectChanges();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['search']);
  });

  it('should book collection data same as state after purchase', () => {
    mockBooksCollectionSelector.setResult(mockBooks.items);
    mockStore.refreshState();
    fixture.detectChanges();
    expect(component.booksCollection).toBe(mockBooks.items);
  });
});
