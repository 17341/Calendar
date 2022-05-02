import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Register } from '../../interfaces/Register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  isRegister = false;
  errorMessage = false;
  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {}

  onRegister(register: Register) {
    this.authService.login(register).subscribe(
      (data) => {
        if (data.success === true) {
          console.log(data);
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
