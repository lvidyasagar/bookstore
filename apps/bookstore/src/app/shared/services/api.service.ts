import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Books } from '../models/Books';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getBooksBySearch(searchString: string): Observable<Books> {
    return this.http.get<Books>(environment.googleApiUrl + searchString);
  }
}
