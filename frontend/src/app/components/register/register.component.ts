import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Register } from '../../interfaces/Register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  //Form variables
  lastName: string = '';
  firstName: string = '';
  email: string = '';
  password: string = '';
  password2: string = '';
  isRegister = false;
  errorMessage = false;

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.password !== this.password2) {
      alert('Password mismatch');
    } else {
      this.onRegister({
        last_name: this.lastName,
        first_name: this.firstName,
        email: this.email,
        password: this.password,
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
        }
        this.isRegister = false;
      },
      (err) => {
        this.errorMessage = err;
      }
    );
  }
}
