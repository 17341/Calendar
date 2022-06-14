import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  users: any;

  form = new FormGroup({
    start: new FormControl('', Validators.required),
    end: new FormControl('', Validators.required),
    description: new FormControl(''),
    user: new FormControl('', Validators.required),
  });

  constructor(
    public modalRef: MdbModalRef<ModalComponent>,
    private dataService: DataService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.authService.userByToken().subscribe(
      (data) => {
        if (data) {
          this.dataService.companyEvents(Number(data.company_id)).subscribe(
            (data2) => {
              this.users = data2.filter(
                (user: any) => user.role === 'Team Member'
              );
            },
            (err) => {
              //console.log(err);
            }
          );
        }
      },
      (err) => {
        //console.log(err);
      }
    );
  }

  onSubmit(): void {
    if (this.form.invalid) {
      alert('Invalid form');
      return;
    }
    const newEvent = {
      start_at: this.form.get('start')?.value,
      end_at: this.form.get('end')?.value,
      description: this.form.get('description')?.value,
      status: 'Taken',
      user_id: this.form.get('user')?.value,
    };

    this.dataService.addEvent(newEvent).subscribe(
      (data) => {
        if (data) {
          alert('Event added');
          this.modalRef.close();
          window.location.reload();
        }
      },
      (err) => {
        alert('Error ' + err);
      }
    );
  }
}
