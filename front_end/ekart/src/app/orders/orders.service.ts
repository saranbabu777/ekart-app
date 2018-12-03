import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AppSettingsService } from '../core/app-settings.service';
import { CartService } from '../cart/services/cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private baseUrl: string;
  private order: any;

  constructor(private appSettings: AppSettingsService, private http: HttpClient, private cartService: CartService) {
    this.baseUrl = this.appSettings.getApiUrl();
    this.order = {};
  }

  getOrderObject() {
    return this.order;
  }

  setOrderParams(data, param) {
    this.order[ param ] = data;
  }

  getorders(username): Promise<any> {
    const url = this.baseUrl + 'orders/' + username;
    return this.http
      .get(url)
      .toPromise()
      .then((response) => {
        return response;
      })
      .catch(this.handleError);
  }

  create(order): Promise<any> {
    const url = this.baseUrl + 'orders/create';
    return this.http
      .post(url, order, { headers: this.getHeaders(), observe: 'response', responseType: 'json' })
      .toPromise()
      .then((response) => {
        this.cartService.setCartCount(response.body[ 'count' ]);
        return 'success';
      })
      .catch(this.handleError);
  }

  updateOrder(order): Promise<any> {
    const url = this.baseUrl + 'orders/update';
    return this.http
      .post(url, order, { headers: this.getHeaders(), observe: 'response', responseType: 'text' })
      .toPromise()
      .then((response) => {
        return 'success';
      })
      .catch(this.handleError);
  }

  createNotification(notification): Promise<any> {
    const url = this.baseUrl + 'notifications/create';
    return this.http
      .post(url, notification, { headers: this.getHeaders(), observe: 'response', responseType: 'text' })
      .toPromise()
      .then((response) => {
        console.log(response);
        return 'success';
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
