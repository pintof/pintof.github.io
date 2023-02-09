import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  constructor(private http: HttpClient) {}
  getResults(): Observable<JSON> {
    return this.http.get<JSON>('http://ip-api.com/json/');
  }
}
