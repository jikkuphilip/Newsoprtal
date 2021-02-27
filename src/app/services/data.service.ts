import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getArticles() {
    let params = new HttpParams();
    params = params.append('api-key', 'uR1j3A82i48Cvvn6A4pQRWBCIhUCIvG7');
    return this.http.get(
      'https://api.nytimes.com/svc/news/v3/content/all/all.json',
      { params }
    );
  }

  getSections() {
    let params = new HttpParams();
    params = params.append('api-key', 'uR1j3A82i48Cvvn6A4pQRWBCIhUCIvG7');
    return this.http.get(
      'https://api.nytimes.com/svc/news/v3/content/section-list.json',
      { params }
    );
  }
}
