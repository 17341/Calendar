import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Register } from '../../interfaces/Register';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  isRegister = false;
  errorMessage = false;

  form = new FormGroup({
    lastName: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.minLength(2)])
    ),
    firstName: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.minLength(2)])
    ),
    email: new FormControl(
      '',
      Validators.compose([Validators.email, Validators.required])
    ),
    password: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.minLength(6)])
    ),
    password2: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.minLength(6)])
    ),
    role: new FormControl(
      'Team Member',
      Validators.compose([Validators.required])
    ),
  });

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  @Output() onLoginClick = new EventEmitter();

  ngOnInit(): void {}

  onSubmit() {
    if (
      this.form.get('password')?.value !== this.form.get('password2')?.value
    ) {
      alert('Password mismatch');
    } else {
      this.onRegister({
        last_name: this.form.get('lastName')?.value,
        first_name: this.form.get('firstName')?.value,
        email: this.form.get('email')?.value,
        password: this.form.get('password')?.value,
        role: this.form.get('role')?.value,
      });
    }
  }

  onRegister(register: Register) {
    if (this.form.invalid) {
      return;
    }
    this.authService.register(register).subscribe(
      (data) => {
        if (data) {
          alert('Registered.');
          this.isRegister = true;
          this.form.reset();
          window.location.reload();
        }
        this.isRegister = false;
      },
      (err) => {
        this.errorMessage = err;
      }
    );
  }

  loginClick() {
    this.onLoginClick.emit();
    //this.router.navigateByUrl('/login');
  }
}
