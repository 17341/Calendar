import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../interfaces/Login';
import { Register } from '../interfaces/Register';

const AUTH_API = 'http://localhost:8000/auth/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  login(login: Login): Observable<any> {
    return this.http.post(AUTH_API + 'login', login, httpOptions);
  }

  register(register: Register): Observable<any> {
    return this.http.post(AUTH_API + 'register', register, httpOptions);
  }
}
