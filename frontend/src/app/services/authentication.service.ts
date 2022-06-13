import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../interfaces/Login';
import { Register } from '../interfaces/Register';
import { authUrl, apiUrl } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
  withCredentials: true,
};
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private isLogin = new BehaviorSubject<boolean>(false);
  isLoggedIn = this.isLogin.asObservable();

  private isLogout = new BehaviorSubject<boolean>(true);
  isLoggedOut = this.isLogout.asObservable();

  constructor(private http: HttpClient, private cookieService: CookieService) {
    let accessToken = this.cookieService.get('accessToken');

    //verify if accessToken is valid
    if (accessToken) {
      this.http.get(apiUrl, httpOptions).subscribe(
        () => {
          this.changeLoginState(true);
        },
        (error) => {
          this.changeLoginState(false);
        }
      );
    } else {
      this.changeLoginState(false);
    }
  }

  changeLoginState(newState: boolean) {
    this.isLogin.next(newState);
    this.isLogout.next(!newState);
  }

  logout(): Observable<any> {
    this.changeLoginState(false);
    return this.http.post(
      authUrl + 'logout',
      { refreshToken: this.cookieService.get('refreshToken') },
      httpOptions
    );
  }

  login(login: Login): Observable<any> {
    return this.http.post(authUrl + 'login', login, httpOptions);
  }

  register(register: Register): Observable<any> {
    return this.http.post(apiUrl + 'user', register, httpOptions);
  }
  userByToken(): Observable<any> {
    return this.http.post(
      authUrl + 'userByToken',
      { refreshToken: this.cookieService.get('refreshToken') },
      httpOptions
    );
  }
}
