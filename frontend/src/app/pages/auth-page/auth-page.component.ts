import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
})
export class AuthPageComponent implements OnInit {
  loginClicked = true;
  constructor() {}

  ngOnInit(): void {}

  registerClick() {
    this.loginClicked = false;
  }
  loginClick() {
    this.loginClicked = true;
  }
}
