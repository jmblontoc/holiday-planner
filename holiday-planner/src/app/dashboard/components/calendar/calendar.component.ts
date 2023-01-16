import { Component, Input, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { HolidayItem } from '../../dashboard.models';
import moment from 'moment';
import { COLORS } from '../../dashboard.theme';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  @Input() holidays: HolidayItem[] = [];

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    dateClick: this.onDateClick,
    eventClick: this.onEventClick,
  };

  ngOnInit(): void {
    this.initializeCalendarEvents();
  }

  onDateClick(value: any): void {
    console.log(value);
  }

  onEventClick(value: any): void {
    console.log(value.event.title);
  }

  private initializeCalendarEvents(): void {
    this.calendarOptions.events = this.holidays.map((holiday) => ({
      title: holiday.name,
      date: this.convertToReadableDate(holiday.date),
      backgroundColor: this.getBackgroundColor(holiday.country),
      borderColor: this.getBackgroundColor(holiday.country),
    }));
  }

  private convertToReadableDate(date: string): string {
    const oldFormat = 'MM/DD/YYYY';
    const newFormat = 'YYYY-MM-DD';

    return moment(date, oldFormat).format(newFormat);
  }

  private getBackgroundColor(country: string): string {
    if (country === 'SG') {
      return COLORS.SG_RED_COLOR;
    } else if (country === 'PH') {
      return COLORS.PH_BLUE_COLOR;
    }

    return '#000';
  }
}
