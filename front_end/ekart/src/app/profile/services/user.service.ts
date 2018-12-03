import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';

import { AppSettingsService } from '../../core/app-settings.service';
import { CartService } from '../../cart/services/cart.service';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string;
  private isLoggedIn = new Subject<boolean>();

  constructor(private appSettings: AppSettingsService,
    private http: HttpClient,
    private cookieService: CookieService,
    private cartService: CartService) {
    this.baseUrl = this.appSettings.getApiUrl();
  }

  logout() {
    this.changeLoggedIn(false);
    this.cookieService.delete('activeUser', '/');
    this.cartService.setCartCount(0);
    this.createGuest({ time: new Date() }).then((response) => {
      this.cookieService.set('guestUser', response, 1);/*Expires in 1 days*/
    });
  }

  loggedIn(): Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }

  changeLoggedIn(status: boolean) {
    this.isLoggedIn.next(status);
  }

  setActiveUser(username: string) {
    const guestUser = this.cookieService.get('guestUser');
    if (guestUser) {
      this.cookieService.delete('guestUser', '/');
      this.cartService.updateUser({ guest: guestUser, username: username });
    }
    this.cookieService.set('activeUser', username, 7);/*Expires in 7 days*/
    this.changeLoggedIn(true);
  }

  getActiveUser(): string {
    const activeUser = this.cookieService.get('activeUser');
    if (activeUser) {
      this.changeLoggedIn(true);
      return activeUser;
    } else {
      const guestUser = this.cookieService.get('guestUser');
      if (guestUser) {
        return guestUser;
      } else {
        this.createGuest({ time: new Date() }).then((response) => {
          this.cookieService.set('guestUser', response, 1);/*Expires in 1 days*/
          return response;
        });
      }
    }
  }

  users(): Promise<any> {
    const url = this.baseUrl + 'users/';
    return this.http
      .get(url)
      .toPromise()
      .then((response) => {
        return response;
      })
      .catch(this.handleError);
  }

  create(user): Promise<any> {
    const url = this.baseUrl + 'users/create';
    return this.http
      .post(url, user, { headers: this.getHeaders(), observe: 'response', responseType: 'text' })
      .toPromise()
      .then((response) => {
        console.log(response);
        return 'success';
      })
      .catch(this.handleError);
  }

  update(user) {
    const url = this.baseUrl + 'users/update';
    this.http
      .post(url, user, { headers: this.getHeaders(), observe: 'response', responseType: 'text' })
      .toPromise()
      .then((response) => {
        console.log(response);
      })
      .catch(this.handleError);
  }

  createGuest(user): Promise<any> {
    const url = this.baseUrl + 'users/guest';
    return this.http
      .post(url, user, { headers: this.getHeaders(), observe: 'response', responseType: 'json' })
      .toPromise()
      .then((response) => {
        return response.body[ 'username' ];
      })
      .catch(this.handleError);
  }

  getUser(username): Promise<any> {
    const url = this.baseUrl + 'users/' + username;
    return this.http
      .get(url)
      .toPromise()
      .then((response) => {
        return response;
      })
      .catch(this.handleError);
  }

  getUserByEmail(email): Promise<any> {
    const url = this.baseUrl + 'users/getUserByEmail/' + email;
    return this.http
      .get(url)
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
