import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @Output() onRegisterClick = new EventEmitter();

  form = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  errorMessage = false;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onLogin() {
    if (this.form.invalid) {
      return;
    }

    this.authService
      .login({
        email: this.form.get('email')?.value,
        password: this.form.get('password')?.value,
      })
      .subscribe(
        (data) => {
          if (data) {
            console.log(data);
            alert(`Logged in as: ${data.first_name} ${data.last_name}`);
            this.authService.changeLoginState(true);
          } else {
            alert('Not found');
            this.authService.changeLoginState(false);
          }
        },
        (err) => {
          this.errorMessage = err;
        }
      );
  }
  registerClick() {
    this.onRegisterClick.emit();
  }
}
