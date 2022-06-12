import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';

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
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.dataService.usersList().subscribe(
      (data) => {
        if (data) {
          this.users = data;
        }
      },
      (err) => {
        alert('Error ' + err);
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
      status: 'Free',
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
