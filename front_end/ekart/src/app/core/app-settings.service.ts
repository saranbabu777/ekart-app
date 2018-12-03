import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppSettingsService {

  private apiUrl = "http://localhost:8080/api/";

  constructor() { }

  getApiUrl() {
    return this.apiUrl;
  }
}
