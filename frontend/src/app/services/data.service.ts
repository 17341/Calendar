import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  eventsList(): Observable<any> {
    return this.http.get(apiUrl + 'event', httpOptions);
  }
  usersList(): Observable<any> {
    return this.http.get(apiUrl + 'user', httpOptions);
  }
  addEvent(event: any): Observable<any> {
    return this.http.post(apiUrl + 'event', event, httpOptions);
  }
  updateEvent(event: any, event_id: number): Observable<any> {
    return this.http.put(apiUrl + `event/${event_id}`, event, httpOptions);
  }
}
