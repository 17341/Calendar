import { Component, OnInit, Input, ViewChild, Output } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { DataService } from '../../services/data.service';
import { ModifyModalComponent } from '../../components/modify-modal/modify-modal.component';
import { ExchangeModalComponent } from '../../components/exchange-modal/exchange-modal.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  @Input() view: any;
  user: any;

  modalRef: MdbModalRef<ModifyModalComponent> | null = null;
  calendarOptions: CalendarOptions = {
    // headerToolbar: { center: 'dayGridMonth,timeGridWeek,listWeek,dayGridWeek' },
    //dateClick: this.handleDateClick.bind(this),
    eventClick: this.eventClick.bind(this),
    initialView: 'dayGridMonth',
    events: [],
    height: 700,
    eventDrop: this.handleUpdate.bind(this),
    eventResize: this.handleUpdate.bind(this),
  };

  // handleDateClick(arg: any) {
  //   console.log(arg);
  // }

  @ViewChild('calendar', { static: true }) calendar: any;

  constructor(
    private authService: AuthenticationService,
    private dataService: DataService,
    private modalService: MdbModalService
  ) {}

  ngOnInit(): void {
    this.authService.userByToken().subscribe(
      (data) => {
        if (data) {
          this.user = data;
          let events: any = [];

          this.dataService.companyEvents(Number(data.company_id)).subscribe(
            (data2) => {
              data2.forEach((user: any) => {
                user.events.forEach((event: any) => {
                  events.push({
                    title: event.user_id,
                    start: event.start_at,
                    end: event.end_at,
                    backgroundColor:
                      event.status === 'Free'
                        ? 'orange'
                        : this.user.user_id === event.user_id
                        ? 'green'
                        : null,
                    borderColor:
                      event.status === 'Free'
                        ? 'orange'
                        : this.user.user_id === event.user_id
                        ? 'green'
                        : null,
                    editable: this.user.role == 'Team Leader' ? true : false,
                    durationEditable:
                      this.user.role == 'Team Leader' ? true : false,
                    description: event.description,
                    id: event.event_id,
                  });
                });
              });
              this.calendarOptions.events = events;
            },
            (err) => {
              console.log(err);
            }
          );
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  ngOnChanges() {
    let calendarApi = this.calendar.getApi();
    calendarApi.changeView(this.view);
  }
  handleUpdate(arg: any) {
    let newEvent = {
      start_at: arg.event.startStr,
      end_at: arg.event.endStr,
    };
    this.dataService.updateEvent(newEvent, arg.event.id).subscribe(
      (data) => {
        console.log('Updated event');
      },
      (err) => {
        console.log(err);
      }
    );
  }
  eventClick(info: any) {
    // info.el.style.backgroundColor = 'red';
    localStorage.setItem('selectedEvent', info.event.id);
    if (this.user.role == 'Team Leader') {
      this.modalRef = this.modalService.open(ModifyModalComponent);
    } else {
      this.modalRef = this.modalService.open(ExchangeModalComponent);
    }
  }
}
