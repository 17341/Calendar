import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../interfaces/Login';
import { Register } from '../interfaces/Register';
import { baseUrl } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  private isLogin = new BehaviorSubject<boolean>(false);
  isLoggedIn = this.isLogin.asObservable();

  private isLogout = new BehaviorSubject<boolean>(true);
  isLoggedOut = this.isLogout.asObservable();

  changeLoginState(newState: boolean) {
    this.isLogin.next(newState);
    this.isLogout.next(!newState);
  }

  login(login: Login): Observable<any> {
    return this.http.post(baseUrl + 'login', login, httpOptions);
  }

  register(register: Register): Observable<any> {
    return this.http.post(baseUrl + 'user', register, httpOptions);
  }
}
