import { Injectable } from '@angular/core';
import { AppSettingsService } from '../core/app-settings.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private baseUrl: string;

  constructor(private appSettings: AppSettingsService, private http: HttpClient) {
    this.baseUrl = this.appSettings.getApiUrl();
  }

  getNotifications(username): Promise<any> {
    const url = this.baseUrl + 'notifications/' + username;
    return this.http
      .get(url)
      .toPromise()
      .then((response) => {
        return response;
      })
      .catch(this.handleError);
  }

  updateNotification(notification): Promise<any> {
    const url = this.baseUrl + 'notifications/update';
    return this.http
      .post(url, notification, { headers: this.getHeaders(), observe: 'response', responseType: 'text' })
      .toPromise()
      .then((response) => {
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
