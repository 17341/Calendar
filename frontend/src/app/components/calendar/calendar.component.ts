import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  @Input() view: any;

  calendarOptions: CalendarOptions = {
    eventClick: function (info) {
      info.el.style.borderColor = 'red';
    },
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this),
    events: [],
    height: 700,
    eventDrop: this.handleDrag.bind(this),
  };

  handleDateClick(arg: any) {}

  @ViewChild('calendar', { static: true }) calendar: any;

  constructor(private dataService: DataService) {}

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
  handleDrag(arg: any) {
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
}
