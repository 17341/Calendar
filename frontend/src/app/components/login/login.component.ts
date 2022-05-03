import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  isLogin = false;
  errorMessage = false;
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onLogin() {
    this.authService
      .login({ email: this.email, password: this.password })
      .subscribe(
        (data) => {
          if (data) {
            alert(`Logged in as: ${data.first_name} ${data.last_name}`);
            this.isLogin = true;
          } else {
            alert('Not found');
            this.isLogin = false;
          }
        },
        (err) => {
          this.errorMessage = err;
        }
      );
  }
  registerClick() {
    this.router.navigateByUrl('/register');
  }
}
