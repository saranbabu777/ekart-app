import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { AppSettingsService } from '../../core/app-settings.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private baseUrl: string;
  private cartCount = new Subject<number>();

  constructor(private appSettings: AppSettingsService, private http: HttpClient) {
    this.baseUrl = this.appSettings.getApiUrl();
  }

  getCartCount(): Observable<number> {
    return this.cartCount.asObservable();
  }

  fetchCartCount(username) {
    const url = this.baseUrl + 'cart/cart-count';
    this.http
      .post(url, { username: username }, { headers: this.getHeaders(), observe: 'response', responseType: 'json' })
      .toPromise()
      .then((response) => {
        this.setCartCount(response.body[ 'count' ]);
      })
      .catch(this.handleError);
  }

  cartItems(username): Promise<any> {
    const url = this.baseUrl + 'cart/' + username;
    return this.http
      .get(url)
      .toPromise()
      .then((response) => {
        return response;
      })
      .catch(this.handleError);
  }

  add(data): Promise<any> {
    const url = this.baseUrl + 'cart/add';
    return this.http
      .post(url, data, { headers: this.getHeaders(), observe: 'response', responseType: 'json' })
      .toPromise()
      .then((response) => {
        if (!response.body[ 'error' ]) {
          this.setCartCount(response.body[ 'count' ]);
        }
        return response.body;
      })
      .catch(this.handleError);
  }

  addToWishlist(data): Promise<any> {
    const url = this.baseUrl + 'wishlist/add';
    return this.http
      .post(url, data, { headers: this.getHeaders(), observe: 'response', responseType: 'json' })
      .toPromise()
      .then((response) => {
        return response.body;
      })
      .catch(this.handleError);
  }

  update(data): Promise<any> {
    const url = this.baseUrl + 'cart/update';
    return this.http
      .post(url, data, { headers: this.getHeaders(), observe: 'response', responseType: 'json' })
      .toPromise()
      .then((response) => {
        if (!response.body[ 'error' ]) {
          this.setCartCount(response.body[ 'count' ]);
        }
        return response.body;
      })
      .catch(this.handleError);
  }

  updateUser(data): Promise<any> {
    const url = this.baseUrl + 'cart/update-user';
    return this.http
      .post(url, data, { headers: this.getHeaders(), observe: 'response', responseType: 'json' })
      .toPromise()
      .then((response) => {
        if (!response.body[ 'error' ]) {
          this.setCartCount(response.body[ 'count' ]);
        }
        return response.body;
      })
      .catch(this.handleError);
  }

  delete(data): Promise<any> {
    const url = this.baseUrl + 'cart/delete';
    return this.http
      .post(url, data, { headers: this.getHeaders(), observe: 'response', responseType: 'json' })
      .toPromise()
      .then((response) => {
        if (!response.body[ 'error' ]) {
          this.setCartCount(response.body[ 'count' ]);
        }
        return response.body;
      })
      .catch(this.handleError);
  }

  setCartCount(count: number) {
    this.cartCount.next(count);
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
