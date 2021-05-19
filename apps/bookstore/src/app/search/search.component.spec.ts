import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchComponent } from './search.component';
import { ApiService } from '../shared/services/api.service';
import { Books, Items } from '../shared/models/Books';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

const book: Items = {
  id: '123',
  volumeInfo: {
    title: 'Test',
    authors: ['test1'],
    averageRating: 1,
    description: 'Sample',
    imageLinks: { smallThumbnail: '', thumbnail: '' },
    language: 'en',
    pageCount: 12,
    publisher: 'Test',
    subtitle: 'Test12',
  },
};

const books: Books = {
  kind: '',
  items: [book],
  totalitems: 1
};

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let apiService: ApiService;
  let dialog: MatDialog;
  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        SharedModule,
        BrowserAnimationsModule
      ],
      providers: [
        ApiService,
        MatDialog,
        { provide: Router, useValue: mockRouter }
      ],
      declarations: [ SearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    dialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('submmiting search form should call books api service', () => {
    expect(component.searchForm.valid).toBeFalsy();
    component.searchForm.controls.searchString.setValue('Angular');
    expect(component.searchForm.valid).toBeTruthy();

    spyOn(apiService, 'getBooksBySearch').and.returnValue(of(books));
    component.searchBooks();
    expect(apiService.getBooksBySearch).toHaveBeenCalledWith('Angular');
    expect(component.books.items.length).toBe(1);

  });

  it('should show error dialog if search returns empty/undefined', () => {
    const testbook: Books = {kind: '', items: [], totalitems: 0};
    expect(component.searchForm.valid).toBeFalsy();
    component.searchForm.controls.searchString.setValue('Angular');
    expect(component.searchForm.valid).toBeTruthy();

    spyOn(apiService, 'getBooksBySearch').and.returnValue(of(testbook));
    spyOn(dialog, 'open');
    component.searchBooks();
    expect(apiService.getBooksBySearch).toHaveBeenCalled();
    expect(dialog.open).toHaveBeenCalled();
  });

  it('should redirect to book detail page when click on book', () => {
    component.redirectToBookDetail('1')
    expect(mockRouter.navigate).toHaveBeenCalledWith(['book-detail', '1']);
  });

});
