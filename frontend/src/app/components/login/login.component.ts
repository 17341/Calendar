import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Login } from '../../interfaces/Login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLogin = false;
  errorMessage = false;
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onLogin(login: Login) {
    this.authService.login(login).subscribe(
      (data) => {
        if (data !== null) {
          console.log(data);
          this.isLogin = true;
        }
        this.isLogin = false;
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
