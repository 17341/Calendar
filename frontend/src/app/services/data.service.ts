import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private isLogin = new BehaviorSubject<boolean>(false);
  isLoggedIn = this.isLogin.asObservable();

  constructor() {}

  changeLoginState(newState: boolean) {
    this.isLogin.next(newState);
  }
}
