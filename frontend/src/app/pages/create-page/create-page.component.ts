import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { SharedServiceService } from 'src/app/services/shared-service.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss'],
})
export class CreatePageComponent implements OnInit {
  user: any;

  form = new FormGroup({
    companyName: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.minLength(2)])
    ),
    password: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.minLength(6)])
    ),
    // users: new FormControl([]),
  });
  constructor(
    private dataService: DataService,
    private router: Router,
    private sharedService: SharedServiceService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.authService.userByToken().subscribe(
      (data) => {
        if (data) {
          this.user = data;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onSubmit(): void {
    console.log(this.form.get('users')?.value);
    if (this.form.invalid) {
      alert('Invalid form');
      return;
    }
    this.dataService
      .createCompany({
        name: this.form.get('companyName')?.value,
        password: this.form.get('password')?.value,
      })
      .subscribe(
        (data) => {
          if (data) {
            alert('Company created');
            this.dataService
              .userUpdate(
                {
                  company_id: data.company_id,
                },
                this.user?.email
              )
              .subscribe(
                (data) => {
                  if (data) {
                    this.router.navigateByUrl('/');
                  }
                },
                (err) => {
                  alert('Error ' + err);
                }
              );
          }
        },
        (err) => {
          alert('Error');
        }
      );
  }
}
