import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  registerClick() {
    this.router.navigateByUrl('/register');
  }
  loginClick() {
    this.router.navigateByUrl('/login');
  }
  navbarClick() {
    this.router.navigateByUrl('/');
  }
}
