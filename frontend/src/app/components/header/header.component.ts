import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { SharedServiceService } from 'src/app/services/shared-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  createClick() {
    this.router.navigateByUrl('/create');
  }
  joinClick() {
    this.router.navigateByUrl('/join');
  }
  navbarClick() {
    //this.router.navigateByUrl('/');
  }

  logoutClick() {
    this.authService.logout().subscribe();
  }
}
