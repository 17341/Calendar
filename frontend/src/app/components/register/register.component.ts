import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Register } from '../../interfaces/Register';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  isRegister = false;
  errorMessage = false;

  form = new FormGroup({
    lastName: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    password2: new FormControl('', Validators.required),
  });

  constructor(private authService: AuthenticationService) {}

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
        role: 'Member',
      });
    }
  }

  onRegister(register: Register) {
    this.authService.register(register).subscribe(
      (data) => {
        console.log(data);
        if (data) {
          console.log(data);
          alert('Registered.');
          this.isRegister = true;
          this.form.reset();
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
  }
}
