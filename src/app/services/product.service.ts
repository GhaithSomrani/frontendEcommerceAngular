import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://127.0.0.1:5000/api'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  getProducts(
    name?: string,
    brand?: string,
    category?: string,
    start_date?: string,
    end_date?: string,
    min_price?: number,
    max_price?: number,
    store?: string,
    page: number = 1,
    page_size: number = 99999,
    sort_by: string = 'timestamp',
    sort_order: string = 'desc'
  ): Observable<any> {
    const params = new HttpParams()
      .set('name', name || '')
      .set('brand', brand || '')
      .set('category', category || '')
      .set('start_date', start_date || '')
      .set('end_date', end_date || '')
      .set('min_price', min_price !== undefined ? min_price.toString() : '')
      .set('max_price', max_price !== undefined ? max_price.toString() : '')
      .set('store', store || '')
      .set('page', page.toString())
      .set('page_size', page_size.toString())
      .set('sort_by', sort_by)
      .set('sort_order', sort_order);

    return this.http.get<any>(`${this.baseUrl}/products`, { params });
  }



  getGroupedProducts(store: string): Observable<any> {
    const params = new HttpParams().set('store', store);
    return this.http.get<any>(`${this.baseUrl}/grouped-products`, { params })
      .pipe(
        catchError(error => {
          throw 'Error getting grouped products: ' + error;
        })
      );
  }

  getProductsByReference(reference: string, store: string): Observable<any> {
    const params = new HttpParams()
      .set('reference', reference)
      .set('store', store);
    return this.http.get<any>(`${this.baseUrl}/products-by-reference`, { params })
      .pipe(
        catchError(error => {
          throw 'Error getting products by reference: ' + error;
        })
      );
  }

  getNewProducts(date: string, store: string, page: number, pageSize: number, brand?: string, category?: string): Observable<any> {
    const params = new HttpParams()
      .set('date', date)
      .set('store', store)
      .set('page', page.toString())
      .set('page_size', pageSize.toString())
      .set('brand', brand || '')
      .set('category', category || '');
    return this.http.get<any>(`${this.baseUrl}/new-products`, { params })
      .pipe(
        catchError(error => {
          throw 'Error getting new products: ' + error;
        })
      );
  }

  getPriceChanges(startDate: string, endDate: string, store: string, brand?: string, category?: string): Observable<any> {
    const params = new HttpParams()
      .set('start_date', startDate)
      .set('end_date', endDate)
      .set('store', store)
      .set('brand', brand || '')
      .set('category', category || '');;
    return this.http.get<any>(`${this.baseUrl}/price_changes`, { params })
      .pipe(
        catchError(error => {
          throw 'Error getting price changes: ' + error;
        })
      );
  }
}