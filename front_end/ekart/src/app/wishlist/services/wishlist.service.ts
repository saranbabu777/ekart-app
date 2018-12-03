import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { AppSettingsService } from '../../core/app-settings.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private baseUrl: string;

  constructor(private appSettings: AppSettingsService, private http: HttpClient) {
    this.baseUrl = this.appSettings.getApiUrl();
  }

  favItems(username): Promise<any> {
    const url = this.baseUrl + 'wishlist/' + username;
    return this.http
      .get(url)
      .toPromise()
      .then((response) => {
        return response;
      })
      .catch(this.handleError);
  }

  delete(data): Promise<any> {
    const url = this.baseUrl + 'wishlist/delete';
    return this.http
      .post(url, data, { headers: this.getHeaders(), observe: 'response', responseType: 'json' })
      .toPromise()
      .then((response) => {
        return response.body;
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
