import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { SharedServiceService } from 'src/app/services/shared-service.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-join-page',
  templateUrl: './join-page.component.html',
  styleUrls: ['./join-page.component.scss'],
})
export class JoinPageComponent implements OnInit {
  companies: any;
  user: any;

  form = new FormGroup({
    company: new FormControl('', Validators.compose([Validators.required])),
    password: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.minLength(6)])
    ),
  });

  constructor(
    private dataService: DataService,
    private sharedService: SharedServiceService,
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.dataService.companyList().subscribe(
      (data) => {
        if (data) {
          this.companies = data;
        }
      },
      (err) => {
        alert('Error ' + err);
      }
    );
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
    this.companies.forEach((company: any) => {
      if (company.company_id === Number(this.form.get('company')?.value)) {
        if (company.password === this.form.get('password')?.value) {
          this.dataService
            .userUpdate(
              {
                company_id: this.form.get('company')?.value,
              },
              this.user.email
            )
            .subscribe(
              (data) => {
                if (data) {
                  alert('Joined');
                  this.router.navigateByUrl('/');
                }
              },
              (err) => {
                alert('Error ' + err);
              }
            );
        } else {
          alert('Incorrect Password');
        }
      }
    });
  }
}
