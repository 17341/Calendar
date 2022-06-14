import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { DataService } from '../../services/data.service';
import { AuthenticationService } from '../../services/authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-exchange-modal',
  templateUrl: './exchange-modal.component.html',
  styleUrls: ['./exchange-modal.component.scss'],
})
export class ExchangeModalComponent implements OnInit {
  myevent = false;
  free = false;
  user: any;
  event: any;

  form = new FormGroup({
    start: new FormControl('', Validators.required),
    end: new FormControl('', Validators.required),
    description: new FormControl(''),
    user: new FormControl('', Validators.required),
  });
  constructor(
    public modalRef: MdbModalRef<ExchangeModalComponent>,
    private dataService: DataService,
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
        //console.log(err);
      }
    );
    this.dataService
      .searchEvent(localStorage.getItem('selectedEvent'))
      .subscribe(
        (data) => {
          if (data) {
            this.event = data;
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
              user: new FormControl(
                `${data.user.last_name} ${data.user.first_name}`,
                Validators.required
              ),
            });
            if (data.user.user_id == this.user.user_id) {
              this.myevent = true;
            }
            if (data.status === 'Free') {
              this.free = true;
            }
          }
        },
        (err) => {
          alert('Error ' + err);
        }
      );
  }
  onExchange() {
    this.dataService
      .addExchange({
        status: 'Pending',
        from_user_id: this.user.user_id,
        event_id: this.event.event_id,
        to_user_id: this.event.user_id,
      })
      .subscribe(
        (data) => {
          if (data) {
            alert('Exchange request sent ! ');
            this.modalRef.close();
            window.location.reload();
          }
        },
        (err) => {
          //console.log(err);
        }
      );
  }
  onAbsence() {
    this.dataService
      .updateEvent(
        { status: 'Free' },
        Number(localStorage.getItem('selectedEvent'))
      )
      .subscribe(
        (data) => {
          if (data) {
            alert('Absence alert sent ! ');
            this.modalRef.close();
            window.location.reload();
          }
        },
        (err) => {
          //console.log(err);
        }
      );
  }
  onTake() {
    this.dataService
      .updateEvent(
        { status: 'Taken', user_id: this.user.user_id },
        Number(localStorage.getItem('selectedEvent'))
      )
      .subscribe(
        (data) => {
          if (data) {
            alert('Event taken ! ');
            this.modalRef.close();
            window.location.reload();
          }
        },
        (err) => {
          //console.log(err);
        }
      );
  }
}
