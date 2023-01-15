import { Component, OnInit } from '@angular/core';
import { CalendarView, CalendarEvent } from 'angular-calendar';
import { default as phHolidaysData } from '../../../../../../holiday-data/ph-data.json';
import { default as sgHolidaysData } from '../../../../../../holiday-data/sg-data.json';
import { EventColor } from 'calendar-utils';

type Holiday = {
  date: string;
  name: string;
  category: string;
  country: string;
};

const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();

  events: CalendarEvent[] = [];

  prepareData(source: Holiday[], color: string): void {
    source.map((holiday) => {
      const calendarEvent: CalendarEvent = {
        start: new Date(holiday.date),
        title: holiday.name,
        color: colors[color],
      };
      this.events.push(calendarEvent);
    });
  }

  ngOnInit() {
    this.prepareData(phHolidaysData, 'red');
    this.prepareData(sgHolidaysData, 'blue');
  }
}
