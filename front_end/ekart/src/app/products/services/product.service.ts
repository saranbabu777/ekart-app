import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { AppSettingsService } from '../../core/app-settings.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl: string;
  private products = new Subject<any>();
  private searchQuery = new Subject<boolean>();

  constructor(private appSettings: AppSettingsService, private http: HttpClient) {
    this.baseUrl = this.appSettings.getApiUrl();
  }

  getProducts(): Observable<any> {
    return this.products.asObservable();
  }

  getProductWithId(id): Promise<any> {
    const url = this.baseUrl + 'products/' + id;
    return this.http
      .get(url)
      .toPromise()
      .then((response) => {
        return response;
      })
      .catch(this.handleError);
  }

  filterProducts(filter): Promise<any> {
    const url = this.baseUrl + 'products/filter'
    return this.http
      .post(url, { filter: filter }, { headers: this.getHeaders(), observe: 'response', responseType: 'json' })
      .toPromise()
      .then((response) => {
        return response.body;
      })
      .catch(this.handleError);
  }

  search(query) {
    const url = this.baseUrl + 'products/search'
    this.http
      .post(url, { query: query }, { headers: this.getHeaders(), observe: 'response', responseType: 'json' })
      .toPromise()
      .then((response) => {
        if (query) {
          this.searchQuery.next(true);
        } else {
          this.searchQuery.next(false);
        }
        this.products.next(response.body);
      })
      .catch(this.handleError);
  }

  isSearchQuery(): Observable<boolean> {
    return this.searchQuery.asObservable();
  }

  updateProduct(data): Promise<any> {
    const url = this.baseUrl + 'products/update'
    return this.http
      .post(url, data, { headers: this.getHeaders(), observe: 'response', responseType: 'text' })
      .toPromise()
      .then((response) => {
        return response;
      })
      .catch(this.handleError);
  }

  // Constructs the headers collection to use
  private getHeaders(obj?: any) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    for (const h in obj || {}) {
      if (obj.hasOwnProperty(h)) {
        headers.append(h, obj[ h ]);
      }
    }
    return headers;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error);
  }
}
