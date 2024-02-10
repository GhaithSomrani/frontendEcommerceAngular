import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private baseUrl = 'http://127.0.0.1:5000/api';

  constructor(private http: HttpClient) { }

  getDataStores(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/stores`)
      .pipe(
        catchError(error => {
          throw 'Error getting data stores: ' + error;
        })
      );
  }
}