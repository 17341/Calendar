import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {}

  createClick() {
    //this.router.navigateByUrl('/register');
  }
  joinClick() {
    //this.router.navigateByUrl('/login');
  }
  navbarClick() {
    //this.router.navigateByUrl('/');
  }

  logoutClick() {
    this.authService.logout().subscribe();
  }
}
