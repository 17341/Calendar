import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-modify-modal',
  templateUrl: './modify-modal.component.html',
  styleUrls: ['./modify-modal.component.scss'],
})
export class ModifyModalComponent implements OnInit {
  users: any;

  form = new FormGroup({
    start: new FormControl('', Validators.required),
    end: new FormControl('', Validators.required),
    description: new FormControl(''),
    user: new FormControl('', Validators.required),
  });

  constructor(
    public modalRef: MdbModalRef<ModifyModalComponent>,
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
    this.dataService
      .searchEvent(localStorage.getItem('selectedEvent'))
      .subscribe(
        (data) => {
          if (data) {
            this.form = new FormGroup({
              start: new FormControl(
                data.start_at.split(':00.000Z')[0],
                Validators.required
              ),
              end: new FormControl(
                data.end_at.split(':00.000Z')[0],
                Validators.required
              ),
              description: new FormControl(data.description),
              user: new FormControl(data.user_id, Validators.required),
            });
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
      user_id: this.form.get('user')?.value,
    };

    this.dataService
      .updateEvent(newEvent, Number(localStorage.getItem('selectedEvent')))
      .subscribe(
        (data) => {
          console.log('Updated event');
          this.modalRef.close();
          window.location.reload();
        },
        (err) => {
          console.log(err);
        }
      );
  }
  onDelete(): void {
    this.dataService
      .deleteEvent(Number(localStorage.getItem('selectedEvent')))
      .subscribe(
        (data) => {
          console.log('Event deleted');
          this.modalRef.close();
          window.location.reload();
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
