import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ErrorDialogComponent } from '../shared/error-dialog/error-dialog.component';
import { mockBooks } from '../shared/models/Book-mock';
import { ApiService } from '../shared/services/api.service';
import { SharedModule } from '../shared/shared.module';

import { BookCollectionComponent } from './book-collection.component';

describe('BookCollectionComponent', () => {
  let component: BookCollectionComponent;
  let fixture: ComponentFixture<BookCollectionComponent>;
  let service: ApiService;
  let dialog: MatDialog;
  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        SharedModule,
      ],
      providers: [
        ApiService,
        MatDialog,
        { provide: Router, useValue: mockRouter }
      ],
      declarations: [ BookCollectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookCollectionComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ApiService);
    dialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get book collection from service', () => {
    service.myBookCollectionsList = JSON.parse(JSON.stringify(mockBooks.items));
    component.ngOnInit();
    expect(component.booksCollection.length).toBe(1);
  });

  it('should open popup if book collection is empty and return to search page', () => {
    spyOn(dialog, 'open')
     .and
     .returnValue(
      {afterClosed: () => of(true)} as MatDialogRef<ErrorDialogComponent, any>
     );
    component.openDialog();
    fixture.detectChanges();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['search']);
  });

});
