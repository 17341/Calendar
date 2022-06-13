import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss'],
})
export class CreatePageComponent implements OnInit {
  //users: any;

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
  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    // this.dataService.usersList().subscribe(
    //   (data) => {
    //     if (data) {
    //       this.users = data.filter((user: any) => user.role === 'Team Member');
    //     }
    //   },
    //   (err) => {
    //     alert('Error ' + err);
    //   }
    // );
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

            this.router.navigateByUrl('/');
          }
        },
        (err) => {
          alert('Error');
        }
      );
  }
}
