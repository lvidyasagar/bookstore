import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Items } from '../models/Books';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getBooksBySearch(searchString: string): Observable<Items[]> {
    const url = `${environment.googleApiUrl}/${searchString}`;
    return this.http.get<Items[]>(url);
  }
}
