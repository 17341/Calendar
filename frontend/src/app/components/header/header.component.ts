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
  admin = false;
  hasteam = false;
  username: any;
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.userByToken().subscribe(
      (data) => {
        if (data) {
          data.role == 'Team Leader' ? (this.admin = true) : false;
          data.company_id != null ? (this.hasteam = true) : false;
          this.username = `${data.first_name} ${data.last_name}`;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

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
