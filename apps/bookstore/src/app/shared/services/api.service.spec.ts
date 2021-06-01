import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { mockBooks } from '../models/Book-mock';

import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call google book api and return books', fakeAsync(() => {
    service.getBooksBySearch('Angular').subscribe((data) => {
      expect(data.items.length).toBe(1);
      expect(data.items[0].volumeInfo.title).toBe('Pro Angular 6');
    });

    const req = httpTestingController.expectOne(
      'https://www.googleapis.com/books/v1/volumes?q=Angular'
    );

    expect(req.request.method).toEqual('GET');

    req.flush(mockBooks);

    tick();
  }));

});
