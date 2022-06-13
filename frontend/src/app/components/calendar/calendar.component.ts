import { Component, OnInit, Input, ViewChild, Output } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { DataService } from '../../services/data.service';
import { ModifyModalComponent } from '../../components/modify-modal/modify-modal.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  @Input() view: any;

  modalRef: MdbModalRef<ModifyModalComponent> | null = null;
  calendarOptions: CalendarOptions = {
    // headerToolbar: { center: 'dayGridMonth,timeGridWeek,listWeek,dayGridWeek' },
    eventClick: this.eventClick.bind(this),
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this),
    events: [],
    height: 700,
    eventDrop: this.handleUpdate.bind(this),
    eventResize: this.handleUpdate.bind(this),
  };

  handleDateClick(arg: any) {
    console.log(arg);
  }

  @ViewChild('calendar', { static: true }) calendar: any;

  constructor(
    private dataService: DataService,
    private modalService: MdbModalService
  ) {}

  ngOnInit(): void {
    let events: any = [];
    this.dataService.eventsList().subscribe(
      (data) => {
        data.forEach((event: any) => {
          events.push({
            title: event.user_id,
            start: event.start_at,
            end: event.end_at,
            editable: true,
            durationEditable: true,
            description: event.description,
            id: event.event_id,
          });
        });
        this.calendarOptions.events = events;
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
    info.el.style.backgroundColor = 'red';
    localStorage.setItem('selectedEvent', info.event.id);
    this.modalRef = this.modalService.open(ModifyModalComponent);
  }
}
