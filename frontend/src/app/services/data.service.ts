import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/environments/environment';
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
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  eventsList(): Observable<any> {
    return this.http.get(apiUrl + 'event', httpOptions);
  }
  usersList(): Observable<any> {
    return this.http.get(apiUrl + 'user', httpOptions);
  }
  userUpdate(user: any, user_email: string): Observable<any> {
    return this.http.put(apiUrl + `user/${user_email}`, user, httpOptions);
  }
  addEvent(event: any): Observable<any> {
    return this.http.post(apiUrl + 'event', event, httpOptions);
  }
  updateEvent(event: any, event_id: number): Observable<any> {
    return this.http.put(apiUrl + `event/${event_id}`, event, httpOptions);
  }
  deleteEvent(event_id: number): Observable<any> {
    return this.http.delete(apiUrl + `event/${event_id}`, httpOptions);
  }
  companyList(): Observable<any> {
    return this.http.get(apiUrl + 'company', httpOptions);
  }
  createCompany(company: any): Observable<any> {
    return this.http.post(apiUrl + 'company', company, httpOptions);
  }
  searchEvent(event_id: any): Observable<any> {
    return this.http.get(apiUrl + `event/${event_id}`, httpOptions);
  }
}
