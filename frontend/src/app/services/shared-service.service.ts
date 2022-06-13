import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class SharedServiceService {
  user: any;

  constructor() {}

  setUser(val: string) {
    this.user = val;
  }
  getUser() {
    return this.user;
  }
}
